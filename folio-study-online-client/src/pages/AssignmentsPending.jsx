import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PendingContainer from "../components/PendingContainer";
import auth from "../firebase/firebase.config";
import useAxiosSecured from "../hooks/useAxiosSecured";

const AssignmentsPending = () => {

    const [assignments, setAssignments] = useState([])
    const axiosSecured = useAxiosSecured()

    useEffect(() => {
        axiosSecured.get(`/pending_assignments/${auth.currentUser?.email}`)
            .then(data => {
                setAssignments(data.data)
                toast.success('Pending assignments data successfully fetched')
            })
            .catch(() => toast.error('Could not fetch pending assignments data : try RELOAD'))
    }, [assignments.length])

    return (
        <div className="grid justify-center resize py-24 px-6 md:px-10">
            <PendingContainer assignments={assignments} setAssignments={setAssignments}></PendingContainer>
        </div>
    );
};

export default AssignmentsPending;