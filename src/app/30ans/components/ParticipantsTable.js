import React from "react";

const ParticipantsTable = ({ participants, onCopyInvitation, onEditParticipant }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nom complet</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((participant) => (
          <tr key={participant.id}>
            <td>
              {participant.firstName} {participant.lastName}
            </td>
            <td>{participant.status}</td>
            <td>
              <button onClick={() => onCopyInvitation(participant.firstName, participant.id)}>
                <i className="fas fa-copy"></i>
              </button>
              <button onClick={() => onEditParticipant(participant.id)}>
                <i className="fas fa-edit"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ParticipantsTable;
