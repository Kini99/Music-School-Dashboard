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
        <div className='px-7'>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <h1 className="text-gray-500 mt-2 text-xl" style={{ fontWeight: "normal", letterSpacing: "0.4px" }}>Best Students</h1>
                <h1 className="mt-2 text-md text-pink-700" style={{ fontWeight: "normal" }} onClick={viewCourses}>View All Courses</h1>
            </div>
            <Table style={{fontSize: "14px", marginBottom:"32px"}}>
                <TableHeader>
                    <TableRow>
                        <TableHead style={{textAlign:"left",fontWeight: "700"}}>Reg. No</TableHead>
                        <TableHead style={{textAlign:"center",fontWeight: "700"}}>F. Name</TableHead>
                        <TableHead style={{textAlign:"center",fontWeight: "700"}}>L. Name</TableHead>
                        <TableHead style={{textAlign:"center",fontWeight: "700"}}>Course #</TableHead>
                        <TableHead style={{textAlign:"center",fontWeight: "700"}}>Total Fees</TableHead>
                        <TableHead style={{textAlign:"right",fontWeight: "700"}}>Reg. Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody style={{fontWeight: "400"}}>
                    {currentPageData.map((item) => (
                        <TableRow key={item.regNo}>
                            <TableCell style={{textAlign:"left",fontWeight: "400"}}>{item.regNo}</TableCell>
                            <TableCell style={{textAlign:"center",fontWeight: "400"}}>{item.fName}</TableCell>
                            <TableCell style={{textAlign:"center",fontWeight: "400"}}>{item.lName}</TableCell>
                            <TableCell style={{textAlign:"center",fontWeight: "400"}}>{item.course}</TableCell>
                            <TableCell style={{textAlign:"center",fontWeight: "400"}}>{item.fees}</TableCell>
                            <TableCell style={{textAlign:"right",fontWeight: "400"}}>{item.regDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between" style={{width:"20%",marginLeft:"80%", marginBottom:"32px"}}>
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