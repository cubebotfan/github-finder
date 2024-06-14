import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Search() {
	const [username, setUsername] = useState("");
	const [feedback, setFeedback] = useState("");
	const navigate = useNavigate();
	

	const token = process.env.REACT_APP_API_KEY;
	const options = {headers: { Authorization: `Bearer ${token}`}};
	
	const apiLink = 'https://api.github.com/users/';

	const search = () => {
		axios({
			url: `${apiLink}${username}`,
			method: "GET",
			options
		}).then(res=>{
			setFeedback("");
			navigate(`/users/${username}`)
		}).catch(error=>{
			if (error.code === "ERR_BAD_REQUEST") {
				setFeedback("That user does not exist");
			} else {
				setFeedback(error.message);
			}
		})
	}

	return (
		<>
		<h2>Search GitHub Users</h2>
		<div className="searchbar">
			<input
				type="text"
				placeholder="Search User"
				onChange={e=>{setUsername(e.currentTarget.value.trim().toLowerCase())}}
				onKeyDown={e=>{
					if(e.key==='Enter') {
						search();
					}
				}}
			></input>
			<button
				onClick={search}
			>Search</button>
		</div>
		<p className="search-result">{feedback}</p>
		</>
	)
}

export default Search;