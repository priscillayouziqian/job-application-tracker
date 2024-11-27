import { formatDate } from "../utils/formateDate";

const Note = ({note}) => {
    const { note: noteText, date } = note;

    return (
       <p>
       {noteText}
       <br />
       {formatDate(date)}
       </p>
    );
};

export default Note;