import { useState, useEffect } from "react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../@/components/ui/popover";

const AddCourse = ({ courseData, setCourseData }) => {

    const [newCourse, setNewCourse] = useState({
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
    }, [newCourse]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({
            ...newCourse,
            [name]: value,
        });
    };

    const handleAddCourse = () => {

        const newId = courseData.length > 0 ? courseData[courseData.length - 1].id + 1 : 1;

        const newCourseWithId = { ...newCourse, id: newId };

        const updatedCourseData = [...courseData, newCourseWithId];
        console.log(updatedCourseData)
        localStorage.setItem("courseData", JSON.stringify(updatedCourseData));
        setCourseData(updatedCourseData);

        setNewCourse({
            name: "",
            description: "",
            instructor: "",
            instrument: "",
            day: "",
            students: "",
            price: "",
            status: "Active",
        });
    };


    return (
        <>
            <Popover>
                    <div className="flex justify-end">
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="bg-pink-200 px-4 py-2 rounded-lg mb-10 shadow-md"
                    >
                        <span className="text-2xl">+</span> Add Course
                    </Button>
                    </PopoverTrigger>
                    </div>
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
                                value={newCourse.name}
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
                                value={newCourse.description}
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
                                value={newCourse.instructor}
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
                                value={newCourse.instrument}
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
                                value={newCourse.day}
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
                                value={newCourse.students}
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
                                value={newCourse.price}
                                onChange={(e) => { handleInputChange(e) }}
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddCourse} className="bg-pink-200 ml-[50%] px-4 py-2 rounded-lg mb-10">Add Course</Button>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default AddCourse