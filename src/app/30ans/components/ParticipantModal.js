import React from "react";

const ParticipantModal = ({ participant, companyName, setCompanyName, onSaveChanges, onCloseModal, answer, setAnswer }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseModal}>
          &times;
        </span>
        <h2>Modifier le participant</h2>
        <h3>{participant.firstName} {participant.lastName}</h3> 
        <div className="participant-details">
          <label>
            <input
              type="checkbox"
              checked={companyName}
              onChange={(e) => setCompanyName(e.target.checked)}
              style={{ marginRight: "10px" }}
            />
            Relance manuelle faite ?
          </label>
          <label>
            <input
              type="checkbox"
              checked={answer}
              onChange={(e) => setAnswer(e.target.checked)}
              style={{ marginRight: "10px" }}
            />
            Réponse donnée ?
          </label>
          <button className="cta" onClick={onSaveChanges}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantModal;
