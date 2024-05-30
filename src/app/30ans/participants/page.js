"use client";
import { useEffect, useState } from "react";
import "./../../styles.css";
import ParticipantsTable from "../components/ParticipantsTable";
import Filters from "../components/Filters";
import ParticipantModal from "../components/ParticipantModal";
import CopyInvitationModal from "../components/CopyInvitationModal";
import { fetchParticipants, fetchParticipantDetails, updateParticipant } from "./../api";
import { copyToClipboard, showToast, isMobileDevice } from "./../utils";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [selectedInvitationText, setSelectedInvitationText] = useState("");
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [companyName, setCompanyName] = useState(false);

  useEffect(() => {
    const getParticipants = async () => {
      const data = await fetchParticipants(companyNameFilter, statusFilter);
      setParticipants(data);
    };

    getParticipants();
  }, [companyNameFilter, statusFilter]);

  const handleCopyInvitation = async (firstName, participantId) => {
    const participant = await fetchParticipantDetails(participantId);
    if (participant) {
      const emailShortMetadata = participant.guest_metadata.find(
        (metadata) => metadata.name === "email_short_url"
      );
      const invitationLink = emailShortMetadata ? emailShortMetadata.value : "Lien non disponible";
      const invitationText = `Hello ${firstName},\nJ'espère que tu vas bien ? :)\n\nJe ne sais pas si tu avais bien reçu mon mail d'invitation pour mes 30ans, dans le doute voici le lien : ${invitationLink}\n\nHésite pas à me donner une réponse rapidement pour que je puisse finaliser l'orga ! \n\nGrosses bises & à cet été j'espère !!`;
      
      if (isMobileDevice()) {
        setSelectedInvitationText(invitationText);
        setSelectedParticipantId(participantId);
      } else {
        copyToClipboard(invitationText);
      }
    }
  };

  const handleEditParticipant = async (participantId) => {
    // Fermer la modale de copie avant d'ouvrir la modale de modification
    setSelectedInvitationText("");
    setSelectedParticipantId(null);

    // Attendre un moment pour s'assurer que la modale de copie est fermée
    setTimeout(async () => {
      const participant = await fetchParticipantDetails(participantId);
      if (participant) {
        setSelectedParticipant(participant);
        setCompanyName(participant.company_name === "true");
      }
    }, 300); // Attente de 300ms, ajuster si nécessaire
  };

  const handleSaveChanges = async () => {
    if (!selectedParticipant) return;
    const updatedData = { guest: { company_name: companyName ? "true" : "false" } };
    const success = await updateParticipant(selectedParticipant._id, updatedData);
    if (success) {
      showToast("Les modifications ont été enregistrées avec succès.");
      setSelectedParticipant(null);
    }
  };

  const closeModal = () => {
    setSelectedParticipant(null);
    setSelectedInvitationText("");
    setSelectedParticipantId(null);
  };

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      participant.lastName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="table-container">
      <h1>Liste des Participants</h1>
      <h2>{filteredParticipants.length} participants</h2>
      <input
        type="text"
        placeholder="Filtrer les participants..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Filters
        companyNameFilter={companyNameFilter}
        setCompanyNameFilter={setCompanyNameFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <ParticipantsTable
        participants={filteredParticipants}
        onCopyInvitation={handleCopyInvitation}
        onEditParticipant={handleEditParticipant}
      />
      {selectedParticipant && (
        <ParticipantModal
          participant={selectedParticipant}
          companyName={companyName}
          setCompanyName={setCompanyName}
          onSaveChanges={handleSaveChanges}
          onCloseModal={closeModal}
        />
      )}
      {selectedInvitationText && (
        <CopyInvitationModal
          invitationText={selectedInvitationText}
          participantId={selectedParticipantId}
          onCloseModal={closeModal}
          onEditParticipant={() => handleEditParticipant(selectedParticipantId)}
        />
      )}
    </div>
  );
};

export default Participants;
