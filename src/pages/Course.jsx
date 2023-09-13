import Sidebar from "../components/Sidebar";
import CourseList from "../components/CourseList";
import AddCourse from "../components/AddCourse";
import { useState } from "react";

const Course = () => {
  const [courseData, setCourseData] = useState([]);
  return (
    <div>
      <Sidebar />
      <div className="flex-1 float-right w-[93vw]">
        <div className="px-7">
          <h1 className="text-gray-500 mt-2 text-3xl font-normal">Courses</h1>
          <CourseList courseData={courseData} setCourseData={setCourseData} />
          <AddCourse courseData={courseData} setCourseData={setCourseData} />
        </div>
      </div>
    </div>
  );
}

export default Course;