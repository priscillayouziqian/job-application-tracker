import { Col } from 'react-bootstrap';
import Note from './Note';
import { selectNotesByJobId } from './notesSlice';


const NotesList = ({jobId}) => {
    const notes = selectNotesByJobId(jobId);

    if(notes && notes.length > 0){
        return (
            <Col md='5' className='m-1'>
                <h4>Notes</h4>
                {notes.map((note) => {
                    return <Note key={note.id} note={note} />;
                })}
            </Col>
        )
    }
  return (
    <Col md='5' className='m-1'>
            There are no notes for this job yet.
    </Col>
  )
}

export default NotesList;