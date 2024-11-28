import { createSlice } from '@reduxjs/toolkit';
import { NOTES } from "../shared/NOTES";

const initialState = {
    notesArray: NOTES
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            const newNote = {
                id: state.notesArray.length + 1,
                ...action.payload
            }
            state.notesArray.push(newNote); // Add the new note to the state
        },
        // ... other reducers ...
    },
});

export const notesReducer = notesSlice.reducer;

export const { addNote } = notesSlice.actions; // Export the addNote action
export const selectNotesByJobId = (jobId) => (state) => {
    return state.notes.notesArray.filter(
        (note) => note.jobId === parseInt(jobId)
    );
};

