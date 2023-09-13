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

const LatestEnrollments = () => {

    const [enrollments, setEnrollments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const fetchEnrollments = async () => {
        try {
            const response = await axios.get('../data.json'); 
            const data = response.data.enrollments; 
            setEnrollments(data); 
        } catch (error) {
            console.error('Error fetching enrollment data:', error);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const viewCourses = () => {
        navigate("/courses");
    }

    const totalPages = Math.ceil(enrollments.length / 5);

    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;

    const currentPageData = enrollments.slice(startIndex, endIndex);

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
        <h1 className="text-gray-500 mt-4 text-xl font-normal tracking-wide">Latest Enrollments</h1>
        <h1 className="mt-2 text-md text-pink-700 font-normal cursor-pointer" onClick={viewCourses}>View All Courses</h1>
    </div>
    <Table className="text-sm mb-5 bg-white">
        <TableHeader>
            <TableRow>
                <TableHead className="text-left font-semibold">Enr. No</TableHead>
                <TableHead className="text-center font-semibold">S. Name</TableHead>
                <TableHead className="text-center font-semibold">C. Name</TableHead>
                <TableHead className="text-center font-semibold">Fees</TableHead>
                <TableHead className="text-right font-semibold">Enr. Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className="font-normal">
            {currentPageData.map((item) => (
                <TableRow key={item.enrNo}>
                    <TableCell className="text-left">{item.enrNo}</TableCell>
                    <TableCell className="text-center">{item.sName}</TableCell>
                    <TableCell className="text-center">{item.cName}</TableCell>
                    <TableCell className="text-center">{item.fees}</TableCell>
                    <TableCell className="text-right">{item.enrDate}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    <div className="flex justify-end">
    <div className="flex justify-between gap-2 ml-auto mb-10">
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
</div>
    )
}

export default LatestEnrollments