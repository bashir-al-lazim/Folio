/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import SubmittedCard from "./SubmittedCard";

const SubmittedContainer = ({ assignments }) => {
    return (
        <div>
            <h1 className='text-5xl font-bold text text-yellow-400'>Submitted Assignments</h1>
            <p className='text-xl font-medium mt-6 mb-14'>Don't forget to check your marks!</p>
            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-8 justify-center">

                {
                    assignments.map(assignment => <SubmittedCard key={assignment._id} assignment={assignment}></SubmittedCard>)
                }
            </div>
        </div>
    );
};

export default SubmittedContainer;

SubmittedContainer.propTypes = {
    assignments: PropTypes.array.isRequired,
}