import { Col, Badge, Stack } from 'react-bootstrap';
import Note from './Note';
import { selectNotesByJobId } from './notesSlice';
import NoteForm from './NoteForm';
import { useSelector } from 'react-redux';
import Error from '../components/Error';
import Loading from '../components/Loading';


const NotesList = ({jobId}) => {
    const notes = useSelector(selectNotesByJobId(jobId));
    const isLoading = useSelector((state) => state.notes.isLoading);
    const errMsg = useSelector((state) => state.notes.errMsg); 

    if(isLoading){
        return <Loading />;
    }
    if(errMsg){
        return <Error errMsg={errMsg} />
    }

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