import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreateAssignments from "../pages/CreateAssignments";
import Assignments from "../pages/Assignments";
import UpdateAssignment from "../pages/UpdateAssignment";
import PrivateRoute from "./PrivateRoute";
import AssignmentDetails from "../pages/AssignmentDetails";
import AssignmentsPending from "../pages/AssignmentsPending";
import AssignmentsSubmitted from "../pages/AssignmentsSubmitted";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: 'assignments',
                element: <Assignments />,
            },
            {
                path: 'assignments/details/:id',
                element: <PrivateRoute><AssignmentDetails /></PrivateRoute>,
            },
            {
                path: 'create_assignments',
                element: <PrivateRoute><CreateAssignments /></PrivateRoute>,
            },
            {
                path: 'update_assignment/:id',
                element: <PrivateRoute><UpdateAssignment /></PrivateRoute>,
            },
            {
                path: 'pending_assignments',
                element: <PrivateRoute><AssignmentsPending /></PrivateRoute>,
            },
            {
                path: 'submitted_assignments',
                element: <PrivateRoute><AssignmentsSubmitted /></PrivateRoute>,
            },
        ],
    },
]);

export default router;