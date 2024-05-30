import React from "react";

const ParticipantModal = ({ participant, companyName, setCompanyName, onSaveChanges, onCloseModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseModal}>
          &times;
        </span>
        <h2>Modifier le participant</h2>
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
          <button className="cta" onClick={onSaveChanges}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantModal;
