import PropTypes from 'prop-types';
import PendingCard from './PendingCard';

const PendingContainer = ({ assignments, setAssignments }) => {
    return (
        <div>
            <h1 className='text-5xl font-bold text text-yellow-400'>Pending Assignments</h1>
            <p className='text-xl font-medium mt-6 mb-14'>Evaluate others, with your contribution our community can flourish!</p>
            <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10">
                {
                    assignments.map(assignment => <PendingCard key={assignment._id} assignment={assignment} assignments={assignments} setAssignments={setAssignments}></PendingCard>)
                }
            </div>
        </div>
    );
};

export default PendingContainer;

PendingContainer.propTypes = {
    assignments: PropTypes.array.isRequired,
    setAssignments: PropTypes.func.isRequired,
}