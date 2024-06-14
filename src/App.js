import {Routes, Route } from 'react-router-dom';
import './css/base.css';
import './css/app.css';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';


function App() {
  return (
    <>
			<main>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/users/:username' element={<UserDetails />} />
				</Routes>
			</main>
		</>
  );
}

export default App;