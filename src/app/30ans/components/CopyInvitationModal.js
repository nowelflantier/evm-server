import React from "react";
import { copyToClipboard } from "./../utils";
import "./CopyInvitationModal.css";

const CopyInvitationModal = ({ invitationText, onCloseModal, onEditParticipant }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCloseModal}>
          &times;
        </span>
        <h2>Invitation</h2>
        <div className="invitation-text">
          <p>{invitationText}</p>
        </div>
        <div className="modal-buttons">
          <button className="cta" onClick={() => copyToClipboard(invitationText)}>
            Copier
          </button>
          <button className="cta" onClick={onEditParticipant}>
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyInvitationModal;
