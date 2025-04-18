import RequestCard from "./RequestCard";

export default function RoommateRequests({roommateRequests}) {
    return (
        <div className="roommate-requests">
            <div className="head">
                <h2>Roommate Requests</h2>
                <div className="see-all" style={{  width: 'fit-content' }}>
                    Voir Tout
                </div>

            </div>
            <div className="requests-list">
                {roommateRequests.map((request, index) => (
                    <RequestCard key={index} request={request} />
                ))}
            </div>
        </div>
    );
}