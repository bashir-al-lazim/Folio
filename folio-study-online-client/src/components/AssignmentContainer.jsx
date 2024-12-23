import AssignmentCard from "./AssignmentCard";
import PropTypes from 'prop-types';

const AssignmentContainer = ({ assignments, setAssignments }) => {
    return (
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-8 justify-center">
            {
                assignments.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment} assignments={assignments} setAssignments={setAssignments}></AssignmentCard>)
            }
        </div>
    );
};

export default AssignmentContainer;

AssignmentContainer.propTypes = {
    assignments: PropTypes.array.isRequired,
    setAssignments: PropTypes.func.isRequired,
}