import { BsPeopleFill } from 'react-icons/bs';

const Header = () => {
    return (
        <div className="px-7 py-5">
            <h1 className="text-gray-500 mt-2 text-3xl font-normal">Overview</h1>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div className="bg-white rounded overflow-hidden shadow-md">
                    <div className="flex p-4 items-center">
                        <div className="bg-green-300 rounded-full p-2 mr-2">
                            <BsPeopleFill />
                        </div>
                        <div>
                            <p className="text-2xl">164</p>
                            <p className="text-gray-600">Total number of students</p>
                        </div>
                    </div>
                    <p className="text-pink-700 text-right px-5 py-2 text-sm cursor-pointer hover:font-bold">View</p>
                </div>

                <div className="bg-white rounded overflow-hidden shadow-md">
                    <div className="flex p-4 items-center">
                        <div className="bg-green-300 rounded-full p-2 mr-2">
                            <BsPeopleFill />
                        </div>
                        <div>
                            <p className="text-2xl">12</p>
                            <p className="text-gray-600">Total number of courses</p>
                        </div>
                    </div>
                    <p className="text-pink-700 text-right px-5 py-2 text-sm cursor-pointer hover:font-bold">View</p>
                </div>

                <div className="bg-white rounded overflow-hidden shadow-md">
                    <div className="flex p-4 items-center">
                        <div className="bg-green-300 rounded-full p-2 mr-2">
                            <BsPeopleFill />
                        </div>
                        <div>
                            <p className="text-2xl">$2000</p>
                            <p className="text-gray-600">Total amount earned</p>
                        </div>
                    </div>
                    <p className="text-pink-700 text-right px-5 py-2 text-sm cursor-pointer hover:font-bold">View</p>
                </div>

                <div className="bg-white rounded overflow-hidden shadow-md">
                    <div className="flex p-4 items-center">
                        <div className="bg-green-300 rounded-full p-2 mr-2">
                            <BsPeopleFill />
                        </div>
                        <div>
                            <p className="text-2xl">Guitar</p>
                            <p className="text-gray-600">Best performing course</p>
                        </div>
                    </div>
                    <p className="text-pink-700 text-right px-5 py-2 text-sm cursor-pointer hover:font-bold">View</p>
                </div>

                <div className="bg-white rounded overflow-hidden shadow-md">
                    <div className="flex p-4 items-center">
                        <div className="bg-green-300 rounded-full p-2 mr-2">
                            <BsPeopleFill />
                        </div>
                        <div>
                            <p className="text-2xl">Flute</p>
                            <p className="text-gray-600">Worst performing course</p>
                        </div>
                    </div>
                    <p className="text-pink-700 text-right px-5 py-2 text-sm cursor-pointer hover:font-bold">View</p>
                </div>
            </div>
        </div>
    )
}

export default Header