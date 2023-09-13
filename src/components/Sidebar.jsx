import logo from "../assets/logo1.png";
import home from "../assets/home.png";
import courses from "../assets/courses.png";
import logouticon from "../assets/logout.png";
import { useNavigate } from 'react-router';

const Sidebar = () => {

const navigate=useNavigate();

const logout=()=>{
    localStorage.removeItem('isAuth');
    window.location.reload();
}

const viewCourses = () => {
    navigate("/courses");
}

const viewHome = () => {
    navigate("/");
}

  return (
    <div className="h-screen flex flex-col w-1/12 p-4 border-r border-gray-300 items-center bg-white h-100%">
    <img src={logo} alt="Logo" className="w-16 h-12 mb-8" onClick={viewHome}/>
    <div className="bg-pink-200 p-2 rounded-lg mt-2 flex flex-col items-center justify-center w-11/12 cursor-pointer" onClick={viewHome}>
        <img src={home} alt="Home" className="w-6 h-6" />
        <p className="text-sm text-pink-700 mt-2">Home</p>
    </div>
    <div className="bg-blue-200 p-2 rounded-lg mt-2 flex flex-col items-center justify-center w-11/12 cursor-pointer" onClick={viewCourses}>
        <img src={courses} alt="Courses" className="w-6 h-6" />
        <p className="text-sm text-gray-600 mt-2">Courses</p>
    </div>
    <div className="p-2 rounded-lg mt-2 flex flex-col items-center justify-center w-11/12 cursor-pointer" onClick={logout}>
        <img src={logouticon} alt="Courses" className="w-6 h-6" />
        <p className="text-sm text-gray-600 mt-2">Logout</p>
    </div>
</div>
  )
}

export default Sidebar