'use client'
// app/participants/page.js
import { useEffect, useState } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import "./../styles.css";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const apiUrl = '/api/30ans/participants?search=status%3Aimported%2Cinvited%20sort%3Alastname-asc';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des participants');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const mappedParticipants = data.map(participant => ({
            id: participant._id,
            firstName: participant.first_name,
            lastName: participant.last_name
          }));
          setParticipants(mappedParticipants);
          console.log('Participants:', mappedParticipants);
        } else {
          console.error('Les données reçues ne sont pas valides:', data);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des participants: useeffect', error);
      });
  }, []);

  const handleCopyInvitation = async (firstName, participantId) => {
    try {
      const response = await fetch(`/api/30ans/participants/${participantId}`);
      const data = await response.json();
  
      console.log('Data received from Eventmaker API front:', data); // Vérifier les données reçues
      console.log(data.guest_metadata);
  
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la récupération des informations du participant');
      }
  
      // Trouver l'objet dans guest_metadata dont le name est email_short
      const emailShortMetadata = data.guest_metadata.find(metadata => metadata.name === 'email_short_url');
      const invitationLink = emailShortMetadata ? emailShortMetadata.value : 'Lien non disponible';
  
      const invitationText = `Hello ${firstName},\nJ'espère que tu vas bien ? :)\n\nJe ne sais pas si tu avais bien reçu mon mail d'invitation pour mes 30ans, dans le doute voici le lien : ${invitationLink}\n\nHésite pas à me donner une réponse rapidement pour que je puisse finaliser l'orga ! \n\nGrosses bises & à cet été j'espère ! !`;
  
      navigator.clipboard.writeText(invitationText).then(() => {
        Toastify({
          text: "Le texte d'invitation a été copié dans le presse-papier.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#4CAF50",
          stopOnFocus: true,
        }).showToast();
      });
    } catch (err) {
      console.error('Erreur lors de la copie du lien :', err);
    }
  };
  

  const handleEditParticipant = (participantId) => {
    console.log(`Edit participant with ID: ${participantId}`);
  };

  const filteredParticipants = participants.filter(participant =>
    participant.firstName.toLowerCase().includes(filter.toLowerCase()) ||
    participant.lastName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="table-container">
      <h1>Liste des Participants</h1>
      <h2>{filteredParticipants.length} à relancer</h2>
      <input
        type="text"
        placeholder="Filtrer les participants..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.firstName} {participant.lastName}</td>
              <td>
                <button onClick={() => handleCopyInvitation(participant.firstName, participant.id)}>
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
    </div>
  );
};

export default Participants;
