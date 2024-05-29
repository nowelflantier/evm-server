import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function PUT(req) {
  const { eventId, participantId } = req.nextUrl.searchParams;
  const { auth_token, newData } = await req.json();

  try {
    const response = await fetch(`https://app.eventmaker.io/events/${eventId}/guests/${participantId}.json&auth_token=${auth_token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du participant', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
