import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import assignments from "../../Database/assignments";
import { useSelector, useDispatch } from "react-redux";
import {
    addAssignment,
    deleteAssignment,
    setAssignment,
} from "./assignmentsReducer";
import { KanbasState } from "../../store";
import 'bootstrap/dist/css/bootstrap.min.css';


function Assignments() {
    const {courseId} = useParams();

    const assignments = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignments);
    const assignment = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignment);
    const dispatch = useDispatch();
    return (
        <ul className="list-group wd-modules form-control">
            <li className="list-group-item">
                <label>
                    Title:
                    <input
                        className="form-control"
                        value={assignment.title}
                        placeholder="Title"
                        onChange={(e) => dispatch(setAssignment({ ...assignment, title: e.target.value }))}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        className="form-control"
                        value={assignment.description}
                        placeholder="Description"
                        onChange={(e) => dispatch(setAssignment({ ...assignment, description: e.target.value }))}
                    />
                </label>
                <label>
                    Available From Date:
                    <input
                        type="date"
                        value={assignment.availableFromDate}
                        onChange={(e) => dispatch(setAssignment({ ...assignment, availableFromDate: e.target.value }))}
                    />
                </label>
                <label>
                    Due Date:
                    <input
                        type="date"
                        value={assignment.dueDate}
                        onChange={(e) => dispatch(setAssignment({ ...assignment, dueDate: e.target.value }))}
                    />
                </label>
                <label>
                    Points:
                    <input
                        type="number"
                        value={assignment.points}
                        placeholder="Points"
                        onChange={(e) => dispatch(setAssignment({ ...assignment, points: e.target.value }))}
                    />
                </label>
                <button onClick={() => dispatch(addAssignment({ ...assignment, course: courseId }))}>
                    Add
                </button>
            </li>
            {assignments
                .filter((a) => a.course === courseId)
                .map((a, index) => (
                    <li key={index} className="list-group-item">

                        <Link
                            to={`/Kanbas/Courses/${courseId}/Assignments/${a._id}`}>{a.title}
                        </Link>


                        <button
                            onClick={() => dispatch(deleteAssignment(a._id))}>
                            Delete
                        </button>

                        ...
                        {a.title}
                        <p>{a.description}</p>
                        <p>{a._id}</p>
                        ...
                    </li>))}
        </ul>

    );
}



// function Assignments() {
//     const { courseId } = useParams();
//     const assignmentList = assignments.filter(
//         (assignment) => assignment.course === courseId);
//     return (
//         <>
//             {/*{<!-- Add buttons and other fields here -->}*/}
//             <ul className="list-group wd-modules">
//                 <li className="list-group-item">
//                     <div>
//                         <FaEllipsisV className="me-2" /> ASSIGNMENTS
//                         <span className="float-end">
//               <FaCheckCircle className="text-success" />
//               <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
//             </span>
//                     </div>
//                     <ul className="list-group">
//                         {assignmentList.map((assignment) => (
//                             <li className="list-group-item">
//                                 <FaEllipsisV className="me-2" />
//                                 <Link
//                                     to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}
//                                 </Link>
//                                 <span className="float-end">
//                                     <FaCheckCircle className="text-success" />
//                                     <FaEllipsisV className="ms-2" />
//                                 </span>
//                             </li>))}
//                     </ul>
//                 </li>
//             </ul>
//         </>
//     );}












export default Assignments;
