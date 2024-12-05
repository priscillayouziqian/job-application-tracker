import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { NOTES } from "../shared/oldData/NOTES";
import { baseUrl } from "../shared/baseUrl";

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async () => {
        const response = await fetch(baseUrl + 'notes');

        if (!response.ok) {
            const errorMessage = await response.text(); // Get the error message from the response
            return Promise.reject('Unable to fetch, status: ' + response.status + ', message: ' + errorMessage);
        }
        const data = await response.json();
        return data;
    }
)

export const postNote = createAsyncThunk(
    'notes/postNote',
    async(note, {dispatch}) => {
        const response = await fetch(baseUrl + 'notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {'Content-Type':'application/json'}
        })

        if(!response.ok){
            return Promise.reject('Unable to fetch, status: ' + response.status)
        }
        const data = await response.json();
        dispatch(addNote(data));
    }
)

const initialState = {
    notesArray: [],
    isLoading: true,
    errMsg: ''
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.isLoading = false; 
                state.errMsg = ''; 
                state.notesArray = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.isLoading = false; 
                state.errMsg = action.error ? action.error.message : 'Fetch failed'; 
            })
            .addCase(postNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postNote.fulfilled, (state, action) => {
                state.isLoading = false; 
                // Note is already added in the postNote thunk, no need to update here
            })
            .addCase(postNote.rejected, (state, action) => {
                state.isLoading = false;
                alert(
                    'Your note could not be posted\nError: ' + (action.error ? action.error.message : 'Fetch failed')
                ); // Alert user of the error
            });
    }
});

export const notesReducer = notesSlice.reducer;

export const { addNote } = notesSlice.actions; // Export the addNote action
export const selectNotesByJobId = (jobId) => (state) => {
    return state.notes.notesArray.filter(
        (note) => note.jobId === parseInt(jobId)
    );
};

