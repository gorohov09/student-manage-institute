import HomePage from "./pages/home/HomePage";
import CoursesPage from "./pages/course/CoursesPage";
import AddCoursePage from "./pages/course/addCourse/AddCoursePage";
import AddLessonPage from "./pages/course/addLesson/AddLessonPage";
import AddModulePage from "./pages/course/addModule/AddModulePage";
import CourseSinglePage from "./pages/course/courseSinglePage/CourseSinglePage";
import LessonSinglePage from "./pages/course/lessonSinglePage/LessonSinglePage";
import AddTaskPage from "./pages/course/addTask/AddTaskPage";
import AuthForm from "./components/authForm/AuthForm";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import useToken from "./hooks/useToken";

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
			<Route path="/courses" element={<CoursesPage setIsAuth={setIsAuth}/>} />
			<Route path="/courses/:courseId" element={<CourseSinglePage setIsAuth={setIsAuth}/>} />
			<Route path="/addCourse" element={<AddCoursePage setIsAuth={setIsAuth}/>} />
			<Route path="/login" element={<AuthForm setToken={setToken} setIsAuth={setIsAuth}/>}/>
			<Route path="/addModule/:courseId" element={<AddModulePage setIsAuth={setIsAuth} />}/>
			<Route path="/addLesson/:moduleId" element={<AddLessonPage setIsAuth={setIsAuth} />}/>
			<Route path="/lessons/:lessonId" element={<LessonSinglePage setIsAuth={setIsAuth} />}/>
			<Route path="/addTask/:lessonId" element={<AddTaskPage setIsAuth={setIsAuth} />}/>
		</Routes>
    </div>
  );
}

export default App;