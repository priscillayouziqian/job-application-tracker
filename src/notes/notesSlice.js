import { NOTES } from "../shared/NOTES";

export const selectNotesByJobId = (jobId) => {
    return NOTES.filter(
        (note) => note.jobId === parseInt(jobId)
    );
};