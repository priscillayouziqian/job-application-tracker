import { configureStore } from '@reduxjs/toolkit';
import {notesReducer} from '../notes/notesSlice';
import { jobsReducer } from '../jobs/jobsSlice';

const store = configureStore({
    reducer: {
        notes: notesReducer,
        jobs: jobsReducer
    },
});

export default store;