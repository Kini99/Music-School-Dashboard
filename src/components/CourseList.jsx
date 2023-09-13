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
} from "../../@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../@/components/ui/popover";
import { Button } from '../../@/components/ui/button';
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";

const CourseList = ({ courseData, setCourseData }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(courseData);
    const [editedCourse, setEditedCourse] = useState({
        name: "",
        description: "",
        instructor: "",
        instrument: "",
        day: "",
        students: "",
        price: "",
        status: "Active"
    });

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

    useEffect(() => {
    }, [editedCourse])

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
                    const toEdit = courseData.filter((e) => e.id == course.id)
                    console.log(toEdit)
                    setEditedCourse(toEdit[0])
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse({
            ...editedCourse,
            [name]: value,
        });
    };

    const handleEditCourse = () => {
        if (!editedCourse) {
            return;
        }
        const courseIndex = courseData.findIndex((course) => course.id === editedCourse.id);
        const updatedCourseData = [...courseData];
        updatedCourseData[courseIndex] = editedCourse;
        localStorage.setItem("courseData", JSON.stringify(updatedCourseData));
        setCourseData(updatedCourseData);
        setEditedCourse({
            name: "",
            description: "",
            instructor: "",
            instrument: "",
            day: "",
            students: "",
            price: "",
            status: "Active"
        });
        alert("Course Updated Successfully!");
        window.location.reload();
    };


    return (
        <>
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
                        <TableHead className="font-semibold p-2">Name</TableHead>
                        <TableHead className="font-semibold p-2">Description</TableHead>
                        <TableHead className="font-semibold p-2">Instructor</TableHead>
                        <TableHead className="font-semibold p-2">Instrument</TableHead>
                        <TableHead className="font-semibold p-2">Day of Week</TableHead>
                        <TableHead className="font-semibold p-2"># of Students</TableHead>
                        <TableHead className="font-semibold p-2">Price</TableHead>
                        <TableHead className="font-semibold p-2">Status</TableHead>
                        <TableHead className="text-center font-semibold p-2">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-normal">
                    {currentPageData.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-left p-2">{item.name}</TableCell>
                            <TableCell className="text-left p-2">{item.description}</TableCell>
                            <TableCell className="text-left p-2">{item.instructor}</TableCell>
                            <TableCell className="text-left p-2">{item.instrument}</TableCell>
                            <TableCell className="text-left p-2">{item.day}</TableCell>
                            <TableCell className="text-left p-2">{item.students}</TableCell>
                            <TableCell className="text-left p-2">{item.price}</TableCell>
                            <TableCell className="text-left p-2">
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
                                    <Popover>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className="h-8 cursor-pointer">
                                                    <img src={actions1} alt="icon" className="h-full mx-auto" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[150px] bg-white">
                                                <PopoverTrigger asChild><DropdownMenuItem className="text-lg hover:bg-gray-300 cursor-pointer" onClick={() => { handleAction("Edit", item.id) }}>
                                                    Edit Course
                                                </DropdownMenuItem>
                                                </PopoverTrigger>
                                                <DropdownMenuItem className="text-lg hover:bg-gray-300 cursor-pointer" onClick={() => { handleAction("Close", item.id) }}>
                                                    Close Course
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-lg hover:bg-gray-300 cursor-pointer" onClick={() => { handleAction("Archive", item.id) }}>
                                                    Archive Course
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <PopoverContent className="w-80 bg-white">
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        className="col-span-3"
                                                        name="name"
                                                        value={editedCourse.name}
                                                        onChange={(e) => { handleInputChange(e) }}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="description" className="text-right">
                                                        Description
                                                    </Label>
                                                    <Input
                                                        id="description"
                                                        className="col-span-3"
                                                        name="description"
                                                        value={editedCourse.description}
                                                        onChange={(e) => { handleInputChange(e) }}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="instructor" className="text-right">
                                                        Instructor
                                                    </Label>
                                                    <Input
                                                        id="instructor"
                                                        className="col-span-3"
                                                        name="instructor"
                                                        value={editedCourse.instructor}
                                                        onChange={(e) => { handleInputChange(e) }}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="instrument" className="text-right">
                                                        Instrument
                                                    </Label>
                                                    <select
                                                        id="instrument"
                                                        className="col-span-3"
                                                        name="instrument"
                                                        value={editedCourse.instrument}
                                                        onChange={(e) => handleInputChange(e)}
                                                    >
                                                        <option value="">Select an Instrument</option>
                                                        <option value="Guitar">Guitar</option>
                                                        <option value="Sitar">Sitar</option>
                                                        <option value="Percussion">Percussion</option>
                                                        <option value="Flute">Flute</option>
                                                    </select>
                                                </div>

                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="day" className="text-right">
                                                        Day of Week
                                                    </Label>
                                                    <select
                                                        id="day"
                                                        className="col-span-3"
                                                        name="day"
                                                        value={editedCourse.day}
                                                        onChange={(e) => handleInputChange(e)}
                                                    >
                                                        <option value="">Select a Day</option>
                                                        <option value="Monday">Monday</option>
                                                        <option value="Tuesday">Tuesday</option>
                                                        <option value="Wednesday">Wednesday</option>
                                                        <option value="Thursday">Thursday</option>
                                                        <option value="Friday">Friday</option>
                                                        <option value="Saturday">Saturday</option>
                                                        <option value="Sunday">Sunday</option>
                                                    </select>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="students" className="text-right">
                                                        # of Students
                                                    </Label>
                                                    <Input
                                                        id="students"
                                                        className="col-span-3"
                                                        name="students"
                                                        value={editedCourse.students}
                                                        onChange={(e) => { handleInputChange(e) }}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="price" className="text-right">
                                                        Price
                                                    </Label>
                                                    <Input
                                                        id="price"
                                                        className="col-span-3"
                                                        name="price"
                                                        value={editedCourse.price}
                                                        onChange={(e) => { handleInputChange(e) }}
                                                    />
                                                </div>
                                            </div>
                                            <Button onClick={handleEditCourse} className="bg-pink-200 ml-[50%] px-4 py-2 rounded-lg mb-10">Save Changes</Button>
                                        </PopoverContent>
                                    </Popover>
                                )}
                                {item.status === 'Closed' && (
                                    <div className="h-8 cursor-pointer">
                                        <img src={actions2} alt="icon" className="h-full mx-auto" />
                                    </div>
                                )}
                                {item.status === 'Archived' && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <div className="h-8 cursor-pointer">
                                                <img src={actions1} alt="icon" className="h-full mx-auto" />
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[160px] bg-white">
                                            <DropdownMenuItem className="text-lg hover:bg-gray-300 cursor-pointer" onClick={() => { handleAction("Unarchive", item.id) }}>
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
            <div className="flex justify-end">
                <div className="flex justify-between gap-2 ml-auto mb-10">
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
            </div>
        </>
    )
}

export default CourseList