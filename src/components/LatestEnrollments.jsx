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
        <div className='px-7'>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
                <h1 className="text-gray-500 mt-2 text-xl" style={{ fontWeight: "normal", letterSpacing: "0.4px" }}>Latest Enrollments</h1>
                <h1 className="mt-2 text-md text-pink-700" style={{ fontWeight: "normal" }} onClick={viewCourses}>View All Courses</h1>
            </div>
            <Table style={{fontSize: "14px", marginBottom:"32px"}}>
                <TableHeader>
                    <TableRow>
                        <TableHead style={{textAlign:"left",fontWeight: "700"}}>Enr. No</TableHead>
                        <TableHead style={{textAlign:"center",fontWeight: "700"}}>S. Name</TableHead>
                        <TableHead style={{textAlign:"center",fontWeight: "700"}}>C. Name</TableHead>
                        <TableHead style={{textAlign:"center",fontWeight: "700"}}>Fees</TableHead>
                        <TableHead style={{textAlign:"right",fontWeight: "700"}}>Enr. Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody style={{fontWeight: "400"}}>
                    {currentPageData.map((item) => (
                        <TableRow key={item.enrNo}>
                            <TableCell style={{textAlign:"left",fontWeight: "400"}}>{item.enrNo}</TableCell>
                            <TableCell style={{textAlign:"center",fontWeight: "400"}}>{item.sName}</TableCell>
                            <TableCell style={{textAlign:"center",fontWeight: "400"}}>{item.cName}</TableCell>
                            <TableCell style={{textAlign:"center",fontWeight: "400"}}>{item.fees}</TableCell>
                            <TableCell style={{textAlign:"right",fontWeight: "400"}}>{item.enrDate}</TableCell>
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

export default LatestEnrollments