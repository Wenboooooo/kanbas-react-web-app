// import React from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
import assignments from "../../../Database/courses";

import React, {useEffect} from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
// import { assignments } from "../../../Database";
import { useSelector, useDispatch } from "react-redux";
import {
    setAssignment,
    updateAssignment,
} from "../assignmentsReducer";
import { KanbasState } from "../../../store";
import { useNavigate } from 'react-router-dom';




function AssignmentEditor() {
    // const { assignmentId } = useParams();
    // const assignment = assignments.find(
    //     (assignment) => assignment._id === assignmentId);
    // const { courseId } = useParams();
    // const navigate = useNavigate();
    // const handleSave = () => {
    //     console.log("Actually saving assignment TBD in later assignments");
    //     navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    // };
    // return (
    //     <div>
    //         <h2>Assignment Name</h2>
    //         <input value={assignment?.title}
    //                className="form-control mb-2" />
    //         <button onClick={handleSave} className="btn btn-success ms-2 float-end">
    //             Save
    //         </button>
    //         <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
    //               className="btn btn-danger float-end">
    //             Cancel
    //         </Link>
    //     </div>
    // );
    const navigate = useNavigate();

    const {courseId, assignmentId} = useParams();

    const assignments = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignments);
    const assignment = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignment);
    const dispatch = useDispatch();
    // dispatch(setAssignment(assignments.find((a) => a._id === assignmentId)))
    let updatedAssignment = assignment;

    useEffect(() => {
        const assignmentToSet = assignments.find((a) => a._id === assignmentId);
        if (assignmentToSet) {
            dispatch(setAssignment(assignmentToSet));
        }
    }, [assignments, assignmentId, dispatch]);
    // const assignment = useSelector((state: KanbasState) =>
    //     state.assignmentsReducer.assignments.filter((a) => a._id === assignmentId)[0]);
    // const assignment = dispatch(setAssignment(assignments.filter((a) => a._id === assignmentId)[0]))
    // console.log(assignment)
    return (
        <ul className="list-group wd-modules form-control">
            <li className="list-group-item">
                <label>
                    Title:
                    <input
                        placeholder={assignment.title}
                        // onChange={
                        // (e) => {
                        //     dispatch(setAssignment({ ...assignment, title: e.target.value }))
                        //     console.log(assignment.payload.title)
                        // }
                        onChange={(e) => {
                            updatedAssignment = { ...assignment, title: e.target.value };
                            dispatch(setAssignment(updatedAssignment));
                            console.log(updatedAssignment.title);
                        }
                    }
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={assignment.description}
                        placeholder="Description"
                        onChange={(e) => {
                            updatedAssignment = { ...assignment, description: e.target.value };
                            dispatch(setAssignment(updatedAssignment));
                            console.log(updatedAssignment.description);
                            }
                        }
                    />
                </label>
                <label>
                    Available From Date:
                    <input
                        type="date"
                        value={assignment.availableFromDate}
                        onChange={(e) => {
                            updatedAssignment = { ...assignment, description: e.target.value };
                            dispatch(setAssignment(updatedAssignment));
                        }
                            }
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
                <button onClick={() => {
                    dispatch(updateAssignment({ ...updatedAssignment, _id: assignmentId }))
                    navigate(`/Kanbas/Courses/${courseId}/Assignments`)
                }
                }>
                    Update
                </button>

                <button onClick={() => {
                    navigate(`/Kanbas/Courses/${courseId}/Assignments`)
                }
                }>
                    Back
                </button>
            </li>
        </ul>

    );


}
export default AssignmentEditor;