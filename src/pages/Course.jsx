import Sidebar from "../components/Sidebar";
import { FaSearch } from 'react-icons/fa';
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";
import actions1 from "../assets/actions1.png";
import actions2 from "../assets/actions2.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu"

const Course = () => {

  const [courseData, setCourseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(courseData);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('../data.json');
        const data = response.data.courses;
        console.log(data);
        localStorage.setItem("courseData", JSON.stringify(data))
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    const storedCourseData = localStorage.getItem('courseData');
    if (storedCourseData) {
      setCourseData(JSON.parse(storedCourseData));
    } else {
      fetchCourses();
    }
  }, []);

  useEffect(() => {
    const filteredResults = courseData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredResults);
  }, [searchQuery, courseData]);

  const totalPages = Math.ceil(filteredData.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAction = (action, courseId) => {
    const updatedCourseData = courseData.map((course) => {
      if (course.id === courseId) {
        if (action === 'Edit') {
        } else if (action === 'Close') {
          course.status = 'Closed';
          alert(`${course.name} is Closed!`)
        } else if (action === 'Archive') {
          course.status = 'Archived';
          alert(`${course.name} is Archived!`)
        } else if (action === 'Unarchive') {
          course.status = 'Active';
          alert(`${course.name} is Unarchived!`)
        }
      }
      return course;
    });

    setCourseData(updatedCourseData);

    localStorage.setItem('courseData', JSON.stringify(updatedCourseData));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="px-7">
          <h1 className="text-gray-500 mt-2 text-3xl font-normal">Courses</h1>
          <div className="flex justify-between mb-2">
            <h1 className="text-gray-500 mt-4 text-lg font-normal tracking-wide w-40">COURSE LIST</h1>
            <div className="relative w-[30%]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table className="text-sm mb-5 mt-5 bg-white">
            <TableHeader>
              <TableRow className="text-left font-semibold">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Instructor</TableHead>
                <TableHead className="font-semibold">Instrument</TableHead>
                <TableHead className="font-semibold">Day of Week</TableHead>
                <TableHead className="font-semibold"># of Students</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-center font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-normal">
              {currentPageData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left">{item.name}</TableCell>
                  <TableCell className="text-left">{item.description}</TableCell>
                  <TableCell className="text-left">{item.instructor}</TableCell>
                  <TableCell className="text-left">{item.instrument}</TableCell>
                  <TableCell className="text-left">{item.day}</TableCell>
                  <TableCell className="text-left">{item.students}</TableCell>
                  <TableCell className="text-left">{item.price}</TableCell>
                  <TableCell className="text-left">
                    {item.status === 'Active' && (
                      <span className="bg-green-300 px-5 py-2 rounded-lg text-gray-500">
                        {item.status}
                      </span>
                    )}
                    {item.status === 'Closed' && (
                      <span className="bg-pink-200 px-5 py-2 rounded-lg text-gray-500">
                        {item.status}
                      </span>
                    )}
                    {item.status === 'Archived' && (
                      <span className="bg-gray-300 px-5 py-2 rounded-lg text-gray-500">
                        {item.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.status === 'Active' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="h-8">
                            <img src={actions1} alt="icon" className="h-full mx-auto" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[140px] bg-white">
                          <DropdownMenuItem className="text-lg hover:bg-gray-300" onClick={() => { handleAction("Edit", item.id) }}>
                            Edit Course
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-lg hover:bg-gray-300" onClick={() => { handleAction("Close", item.id) }}>
                            Close Course
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-lg hover:bg-gray-300" onClick={() => { handleAction("Archive", item.id) }}>
                            Archive Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {item.status === 'Closed' && (
                      <div className="h-8">
                        <img src={actions2} alt="icon" className="h-full mx-auto" />
                      </div>
                    )}
                    {item.status === 'Archived' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="h-8">
                            <img src={actions1} alt="icon" className="h-full mx-auto" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[160px] bg-white">
                          <DropdownMenuItem className="text-lg hover:bg-gray-300" onClick={() => { handleAction("Unarchive", item.id) }}>
                            Unarchive Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between w-1/5 ml-auto mb-10">
            <button
              className={`bg-pink-700 text-white px-2 rounded text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-500 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`bg-pink-700 text-white px-2 text-sm rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          <button className="bg-pink-200 ml-[90%] px-4 py-2 rounded-lg mb-10">+ Add Course</button>
        </div>
      </div>
    </div>
  );
}

export default Course;