import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { TEST_JOBS } from "../shared/oldData/TEST_JOBS";
import { baseUrl } from "../shared/baseUrl";

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async () => {
        const response = await fetch(baseUrl + 'jobs');

        if(!response.ok){
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
)

const initialState = {
    // tracking if jobs array is being loaded from db.json from json-server. 
    // show error msg from trying to fetch it.
    jobsArray: [],
    isLoading: true,
    errMsg: ''
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMsg = '';
                state.jobsArray = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error ? action.error.message : 'Fetch failed';
            });
    }
})

export const jobsReducer = jobsSlice.reducer;

export const selectAllJobs = (state) => {
    return state.jobs.jobsArray;
}

export const selectJobById = (id) => (state) => {
    return state.jobs.jobsArray.find(
        (job) => job.id == parseInt(id)
    );
}