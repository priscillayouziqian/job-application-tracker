import { createSlice } from "@reduxjs/toolkit";
import { TEST_JOBS } from "../shared/TEST_JOBS";

const initialState = {
    jobsArray: TEST_JOBS
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {    
    }
})

export const jobsReducer = jobsSlice.reducer;

export const selectAllJobs = (state) => {
    return state.jobs.jobsArray;
}