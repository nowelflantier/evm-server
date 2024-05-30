"use client";
// app/participants/page.js
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "./../styles.css";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [companyName, setCompanyName] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      let apiUrl = `/api/30ans/participants?search=status%3Aimported%2Cinvited%2Cregistered%20sort%3Alastname-asc`;
      
      if (companyNameFilter) {
        apiUrl += `%20company_name%3A${companyNameFilter}`;
      }

      if (statusFilter) {
        apiUrl += `%20status%3A${statusFilter}`;
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des participants");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedParticipants = data.map((participant) => ({
            id: participant._id,
            firstName: participant.first_name,
            lastName: participant.last_name,
            status: participant.status,
          }));
          setParticipants(mappedParticipants);
          console.log("Participants:", mappedParticipants);
        } else {
          console.error("Les données reçues ne sont pas valides:", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des participants:", error);
      }
    };

    fetchParticipants();
  }, [companyNameFilter, statusFilter]); 

  const handleCopyInvitation = async (firstName, participantId) => {
    try {
      const response = await fetch(`/api/30ans/participants/${participantId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(
          data.error ||
            "Erreur lors de la récupération des informations du participant"
        );
      }

      const emailShortMetadata = data.guest_metadata.find(
        (metadata) => metadata.name === "email_short_url"
      );
      const invitationLink = emailShortMetadata
        ? emailShortMetadata.value
        : "Lien non disponible";

      const invitationText = `Hello ${firstName},\nJ'espère que tu vas bien ? :)\n\nJe ne sais pas si tu avais bien reçu mon mail d'invitation pour mes 30ans, dans le doute voici le lien : ${invitationLink}\n\nHésite pas à me donner une réponse rapidement pour que je puisse finaliser l'orga ! \n\nGrosses bises & à cet été j'espère ! !`;

      copyToClipboard(invitationText);
    } catch (err) {
      console.error("Erreur lors de la copie du lien :", err);
    }
  };

  const copyToClipboard = (text) => {
    const span = document.createElement("span");
    span.textContent = text;
    span.style.position = "fixed";
    span.style.opacity = 0;
    document.body.appendChild(span);

    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      const successful = document.execCommand('copy');
      const msg = successful
        ? "Le texte d'invitation a été copié dans le presse-papier."
        : "Échec de la copie du texte";
      showToast(msg);
    } catch (err) {
      console.error("Erreur lors de la copie du texte :", err);
    }

    selection.removeAllRanges();
    document.body.removeChild(span);
  };

  const showToast = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      close: false,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #E000B8, #E0B0B8)",
        textAlign: "center",
        marginLeft: "15px",
        marginRight: "15px",
        borderRadius: "10px",
      },
    }).showToast();
  };

  const handleEditParticipant = async (participantId) => {
    try {
      const response = await fetch(`/api/30ans/participants/${participantId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error ||
            "Erreur lors de la récupération des informations du participant"
        );
      }
      setSelectedParticipant(data);
      setCompanyName(data.company_name === "true");
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des informations du participant :",
        err
      );
    }
  };

  const handleSaveChanges = async () => {
    if (!selectedParticipant) return;
  
    const updatedData = {
      "guest": {
        "company_name": companyName ? "true" : "false",
      }
    };
  
    try {
      const response = await fetch(`/api/30ans/participants/${selectedParticipant._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du participant');
      }
  
      showToast("Les modifications ont été enregistrées avec succès.");
      closeModal();
    } catch (err) {
      console.error('Erreur lors de la mise à jour du participant :', err);
    }
  };
  

  const closeModal = () => {
    setSelectedParticipant(null);
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
      <div className="filters">
        <select onChange={(e) => setCompanyNameFilter(e.target.value)} value={companyNameFilter}>
          <option value="">Toutes les relances</option>
          <option value="true">Relancés uniquement</option>
          <option value="false">Non relancés</option>
        </select>
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">Tous les statuts</option>
          <option value="imported,invited">Importé & invité</option>
          <option value="registered">Inscrit</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.id}>
              <td>
                {participant.firstName} {participant.lastName}
              </td>
              <td>
                {participant.status}
              </td>
              <td>
                <button
                  onClick={() =>
                    handleCopyInvitation(participant.firstName, participant.id)
                  }
                >
                  <i className="fas fa-copy"></i>
                </button>
                <button onClick={() => handleEditParticipant(participant.id)}>
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedParticipant && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
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
            <button class="cta" onClick={handleSaveChanges}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Participants;
