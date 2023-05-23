import HomePage from "./pages/home/HomePage";
import AuthForm from "./components/authForm/AuthForm";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import useToken from "./hooks/useToken";
import GroupsPage from "./pages/groups/GroupsPage";

function App() {
	const { token, setToken } = useToken();
	const [isAuth, setIsAuth] = useState(false);

	if(!token && !isAuth) {
		console.log('Токена нет')
		return (
			<>
				<AuthForm setToken={setToken} setIsAuth={setIsAuth}/>
			</>
		)	
	}

  	return (
    <div className="App">
		<Routes>
			<Route path="/" element={<HomePage setIsAuth={setIsAuth}/>} />
			<Route path="/login" element={<AuthForm setToken={setToken} setIsAuth={setIsAuth}/>}/>
			<Route path="/groups" element={<GroupsPage setIsAuth={setIsAuth}/>}/>
		</Routes>
    </div>
  );
}

export default App;