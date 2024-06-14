import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function UserDetails() {
	const navigate = useNavigate();

	const { username } = useParams();
	const [userDetails, setUserDetails] = useState(null);
	const [userRepositories, setuserRepositories] = useState([]);

	useEffect(()=>{
		const token = process.env.REACT_APP_API_KEY;
		const options = {headers: { Authorization: `Bearer ${token}`}};
		const apiLink = 'https://api.github.com/users/';

		axios({
			url: `${apiLink}${username}`,
			method: "GET",
			options
		}).then(res=>{
			setUserDetails(res.data);
			//only do the second if the first fetch succeeded. Don't waste api calls
			axios({
				url: `${apiLink}${username}/repos`,
				method: "GET",
				options
			}).then(res=>{
				setuserRepositories(res.data);
			}).catch(error=>{
			})
		}).catch(error=>{
			navigate('/');
		})
	}, [])

	return(
		(userDetails!=null) ?
			(<motion.div className="container"
				initial={{ position:"relative", opacity: 0, left:'-50px'}}
				animate={{ opacity: 1, left:0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="main-details">
					<img className="avatar" src={userDetails.avatar_url} alt={userDetails.login+"'s avatar"}></img>
					<h2 className="username">{userDetails.login}</h2>
					<div className="user-statistics">
						<div className="statistics-category repositories">
							<p className="count">{userDetails.public_repos}</p>
							<p className="statistic-name">Repositories</p>
						</div>
						<div className="statistics-category followers">
							<p className="count">{userDetails.followers}</p>
							<p className="statistic-name">Followers</p>
						</div>
						<div className="statistics-category following">
							<p className="count">{userDetails.following}</p>
							<p className="statistic-name">following</p>
						</div>
					</div>
					<a href={userDetails.html_url}><button className="profile-button">Visit Profile</button></a>
				</div>
				<h2 className='repositories-title'>Repositories</h2>
				<div className="repositories">
					{userRepositories.map((repo)=>{
						return (
							<a href={repo.html_url} key={repo.id}><div className="repository">
								<div className="info-left">
									<h3 className="repo-name">{repo.name}</h3>
									<p className="repo-desc">{repo.description}</p>
								</div>
								<div className="info-right">
								<p className="repo-updated">Updated on {new Date(repo.updated_at).toDateString()}</p>
								</div>
							</div></a>
						)
					})}
				</div>
			</motion.div>)
			: (<></>)
	)
}

export default UserDetails;