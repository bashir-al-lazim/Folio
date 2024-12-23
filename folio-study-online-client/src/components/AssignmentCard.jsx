import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import useAxiosSecured from "../hooks/useAxiosSecured";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";


const AssignmentCard = ({ assignment, assignments, setAssignments }) => {

    const axiosSecured = useAxiosSecured()

    const { _id, title, description, marks, difficulty, dueDate, author } = assignment

    let setDifficulty = "text-lg font-semibold"

    if (difficulty === 'Hard') { setDifficulty = "text-red-600 text-lg font-semibold" }
    else if (difficulty === 'Medium') { setDifficulty = "text-yellow-500 text-lg font-semibold" }
    else if (difficulty === 'Easy') { setDifficulty = "text-lg text-green-500 font-semibold" }

    const handleDelete = () => {

        if (author !== auth.currentUser?.email) {
            return toast.error('Unauthorised! You can only delete the assignments you have created')
        }

        axiosSecured.delete(`https://folio-server.vercel.app/assignments/${auth.currentUser?.email}?_id=${_id}`)
            .then(data => {
                if (data.data.deletedCount) {
                    toast.success('Assignment deleted successfully!')
                    const remaining = assignments.filter(find => find._id !== _id)
                    setAssignments(remaining)
                }
                else {
                    toast.error('Error! Could not delete assignment : try AGAIN')
                }
            })

    }

    return (
        <div className="relative flex flex-col w-full   md:max-w-[25rem] xl:max-w-[35rem] pl-6 pr-6 xl:pr-0 py-6 divide-y xl:flex-row xl:divide-y-0 xl:divide-x divide-gray-700 rounded-xl box-shadow border-[0.0625rem] border-black">
            <div className="p-3 h-full grid gap-3">
                <div>
                    <h3 className="text-3xl font-semibold">{title}</h3>
                    <p className="text-sm text-gray-400 mt-2">{description.split(' ').slice(0, 20).join(' ')}...</p>
                </div>
                <p>Difficulty: <span className={setDifficulty}>{difficulty}</span></p>
                <div className="w-full flex gap-6 justify-between items-baseline">
                    <span>Marks: {marks}</span>
                    <span>Deadline: {dueDate}</span>
                </div>
            </div>
            <div className="grid xl:grid items-center gap-3 pt-4 xl:pt-0 pl-3 justify-between">
                <div className="space-y-1">
                    <div className="flex flex-wrap gap-3">
                        <Link to={`/assignments/details/${_id}`} className="relative inline-block px-4 py-2 font-medium group">
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative text-black group-hover:text-white">View</span>
                        </Link>
                        <Link to={`/update_assignment/${assignment._id}`} className="relative inline-block px-4 py-2 font-medium group">
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative text-black group-hover:text-white">Update</span>
                        </Link>
                        <Link onClick={() => document.getElementById(`my_modal_${_id}`).showModal()} className="relative inline-block px-4 py-2 font-medium group">
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative text-black group-hover:text-white">Delete</span>
                        </Link>
                    </div>
                </div>
            </div>
            <dialog id={`my_modal_${_id}`} className="modal">
                <div className="modal-box">
                    <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-600 text-white">✕</button></form>
                    <form method="dialog" onSubmit={handleDelete}>
                        <h3 className="font-bold text-xl text-red-500 mb-3">Warning! Assignment will be permanently deleted! Are you sure? </h3>
                        <div className="flex justify-end pt-4">
                            <button className="relative inline-block px-6 py-2 font-medium group text-[1.125rem] transition duration-100">
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-red-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full bg-white group-hover:border-white group-hover:bg-red-600"></span>
                                <span className="relative text-red-500 group-hover:text-white">Delete</span>
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AssignmentCard;

AssignmentCard.propTypes = {
    assignment: PropTypes.object.isRequired,
    assignments: PropTypes.array.isRequired,
    setAssignments: PropTypes.func.isRequired,
}