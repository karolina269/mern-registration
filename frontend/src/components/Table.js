import "./Table.css";

const Table = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Imię i nazwisko</th>
          <th>Wydarzenie</th>
          <th>Miasto</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {props.events.map((event, index) => (
          <tr key={event._id}>
            <td>{index}</td>
            <td>{event.name}</td>
            <td>{event.event.val}</td>
            <td>{event.city.val}</td>
            <td>
              <button onClick={() => props.deleteEvent(event._id)}>Usuń</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
