import { Col, Badge, Stack } from 'react-bootstrap';
import Note from './Note';
import { selectNotesByJobId } from './notesSlice';
import NoteForm from './NoteForm';
import { useSelector } from 'react-redux';


const NotesList = ({jobId}) => {
    const notes = useSelector(selectNotesByJobId(jobId));

    if(notes && notes.length > 0){
        return (
            <Col md='5' className='m-1 mb-3'>
                <h4>Notes</h4>
                {notes.map((note) => {
                    return <Note key={note.id} note={note} />;
                })}

                <NoteForm jobId={jobId} />
            </Col>
        )
    }
  return (
    <Col md="5" className="m-1">
      <Stack direction="horizontal" gap={2}>
        <Badge bg="warning" text="dark">
          Warning
        </Badge>
      </Stack>
      <h4>There are no notes for this application yet.</h4>
    </Col>
  );
}

export default NotesList;