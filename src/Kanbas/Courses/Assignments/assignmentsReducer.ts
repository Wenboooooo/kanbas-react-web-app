import { assignments } from "../../Database";
import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    assignments: assignments,
    assignment: { title: "", description: "", availableFromDate: "", dueDate: "", points: "",}
}

const assignmentSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                { ...action.payload, _id: new Date().getTime().toString() },
                ...state.assignments,
            ];
        },

        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (module) => module._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((module) => {
                if (module._id === action.payload._id) {
                    return action.payload;
                } else {
                    return module;
                }
            });
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },
    }


});


export const { addAssignment, deleteAssignment, updateAssignment, setAssignment} = assignmentSlice.actions;
export default assignmentSlice.reducer;