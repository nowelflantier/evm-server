import React from "react";
import { copyToClipboard } from "./../utils";
import "./CopyInvitationModal.css";

const CopyInvitationModal = ({ invitationText, participantId, onCloseModal, onEditParticipant }) => {
  const handleEdit = () => {
    onCloseModal();  // Fermer la modale actuelle
    onEditParticipant(participantId);  // Ouvrir la modale de modification
  };

  const formatText = (text) => {
    return text.replace(/\n/g, "<br />");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseModal}>
          &times;
        </span>
        <h2>Invitation</h2>
        <div className="invitation-text" dangerouslySetInnerHTML={{ __html: formatText(invitationText) }} />
        <div className="modal-buttons">
          <button className="cta" onClick={() => copyToClipboard(invitationText)}>
            Copier
          </button>
          <button className="cta" onClick={handleEdit}>
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyInvitationModal;
