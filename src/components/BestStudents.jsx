import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../@/components/ui/table";
import { useNavigate } from 'react-router';
import axios from "axios";

const BestStudents = () => {

    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const response = await axios.get('../data.json'); 
            const data = response.data.students; 
            setStudents(data); 
        } catch (error) {
            console.error('Error fetching enrollment data:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const viewCourses = () => {
        navigate("/courses");
    }

    const totalPages = Math.ceil(students.length / 5);

    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;

    const currentPageData = students.slice(startIndex, endIndex);

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

    return (
        <div className="px-7">
    <div className="flex justify-between mb-2">
        <h1 className="text-gray-500 mt-4 text-xl font-normal leading-6 tracking-wide">Best Students</h1>
        <h1 className="mt-2 text-md text-pink-700 font-normal cursor-pointer" onClick={viewCourses}>View All Courses</h1>
    </div>
    <Table className="text-sm mb-5">
        <TableHeader>
            <TableRow>
                <TableHead className="text-left font-semibold">Reg. No</TableHead>
                <TableHead className="text-center font-semibold">F. Name</TableHead>
                <TableHead className="text-center font-semibold">L. Name</TableHead>
                <TableHead className="text-center font-semibold">Course #</TableHead>
                <TableHead className="text-center font-semibold">Total Fees</TableHead>
                <TableHead className="text-right font-semibold">Reg. Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className="font-normal">
            {currentPageData.map((item) => (
                <TableRow key={item.regNo}>
                    <TableCell className="text-left">{item.regNo}</TableCell>
                    <TableCell className="text-center">{item.fName}</TableCell>
                    <TableCell className="text-center">{item.lName}</TableCell>
                    <TableCell className="text-center">{item.course}</TableCell>
                    <TableCell className="text-center">{item.fees}</TableCell>
                    <TableCell className="text-right">{item.regDate}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    <div className="flex justify-between w-1/5 ml-auto mb-5">
        <button
            className={`bg-pink-700 text-white px-2 rounded text-sm ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
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
            className={`bg-pink-700 text-white px-2 text-sm rounded ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
</div>
    )
}

export default BestStudents;