import HomePage from "./pages/home/HomePage";
import AuthForm from "./components/authForm/AuthForm";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import useToken from "./hooks/useToken";
import GroupsPage from "./pages/groups/GroupsPage";
import AddGroupPage from "./pages/addGroup/AddGroupPage";
import GroupSinglePage from "./pages/singleGroup/GroupSinglePage";
import AddStudentPage from "./pages/addStudent/AddStudentPage";
import UpdateGroupPage from "./pages/updateGroup/UpdateGroupPage";
import UpdateStudentPage from "./pages/updateStudent/UpdateStudent";

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
			<Route path="/addGroup" element={<AddGroupPage setIsAuth={setIsAuth}/>}/>
			<Route path="/groupSingle/:groupId" element={<GroupSinglePage setIsAuth={setIsAuth}/>}/>
			<Route path="/addStudent/:groupId" element={<AddStudentPage setIsAuth={setIsAuth}/>}/>
			<Route path="/groupUpdate/:groupId" element={<UpdateGroupPage setIsAuth={setIsAuth}/>}/>
			<Route path="/studentUpdate/:studentId/:groupId" element={<UpdateStudentPage setIsAuth={setIsAuth}/>}/>
		</Routes>
    </div>
  );
}

export default App;