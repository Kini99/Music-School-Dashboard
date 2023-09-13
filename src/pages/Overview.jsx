import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LatestEnrollments from '../components/LatestEnrollments';
import BestStudents from '../components/BestStudents';

const Overview = () => {
  return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Header />
          <LatestEnrollments />
          <BestStudents/>
        </div>
      </div>
  )
}

export default Overview