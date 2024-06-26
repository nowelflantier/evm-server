// app/api/30ans/participants/[guest_id]/route.js
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(request, { params }) {
  const { guest_id } = params;  // Récupérer guest_id depuis les paramètres de l'URL
  const eventId = process.env.EVENTMAKER_EVENT_ID;
  const authToken = process.env.EVENTMAKER_AUTH_TOKEN;

  try {
    const response = await fetch(`https://app.eventmaker.io/api/v1/events/${eventId}/guests/${guest_id}.json?auth_token=${authToken}&guest_metadata=true`);
    const data = await response.json();
    console.log('Data received from Eventmaker API:', data);
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la récupération des informations du participant');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching participant details:', error);
    return NextResponse.json({ error: 'Error fetching participant details' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { guest_id } = params;
  const eventId = process.env.EVENTMAKER_EVENT_ID;
  const authToken = process.env.EVENTMAKER_AUTH_TOKEN;
  const body = await request.json();

  try {
    const response = await fetch(`https://app.eventmaker.io/api/v1/events/${eventId}/guests/${guest_id}.json?auth_token=${authToken}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la mise à jour des informations du participant');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating participant details:', error);
    return NextResponse.json({ error: 'Error updating participant details' }, { status: 500 });
  }
}
