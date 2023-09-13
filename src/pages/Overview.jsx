import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LatestEnrollments from '../components/LatestEnrollments';
import BestStudents from '../components/BestStudents';

const Overview = () => {
  return (
    <div>
      <Sidebar />
      <div className="float-right w-[93vw]">
        <Header />
        <LatestEnrollments />
        <BestStudents />
      </div>
    </div>
  )
}

export default Overview