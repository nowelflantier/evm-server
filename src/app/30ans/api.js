export const fetchParticipants = async (companyNameFilter, statusFilter, answerFilter) => {
    let apiUrl = `/api/30ans/participants?search=status%3Aimported%2Cinvited%2Cregistered%20sort%3Alastname-asc`;
    
    if (answerFilter) {
      apiUrl += `%20position%3A${answerFilter}`;
    }

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
        return data.map((participant) => ({
          id: participant._id,
          firstName: participant.first_name,
          lastName: participant.last_name,
          status: participant.status,
          reponse: participant.position,
        }));
      } else {
        console.error("Les données reçues ne sont pas valides:", data);
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des participants:", error);
      return [];
    }
  };
  
  export const fetchParticipantDetails = async (participantId) => {
    try {
      const response = await fetch(`/api/30ans/participants/${participantId}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des informations du participant");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des informations du participant:", error);
      return null;
    }
  };
  
  export const updateParticipant = async (participantId, updatedData) => {
    try {
      const response = await fetch(`/api/30ans/participants/${participantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du participant");
      }
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du participant:", error);
      return false;
    }
  };
  