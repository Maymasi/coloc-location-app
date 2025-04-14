import RecentMessage from "./RecentMessage";
import RecentProperties from "./RecentProperties";
export default function RecentActivity() {
  return (
    <div className="recent-activity" >
        <RecentMessage className='messages' />
        <RecentProperties className='properties' />
    </div>
  );
}