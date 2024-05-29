import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('eventId');
  const participantId = searchParams.get('participantId');
  const { auth_token, newData } = await req.json();

  // Ajouter les en-têtes CORS
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*'); // Vous pouvez restreindre à un domaine spécifique
  headers.set('Access-Control-Allow-Methods', 'OPTIONS, PUT');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const response = await fetch(`https://app.eventmaker.io/events/${eventId}/guests/${participantId}.json&auth_token=${auth_token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    const data = await response.json();
    return new NextResponse(JSON.stringify(data), { headers, status: response.status });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du participant', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur interne du serveur' }), { headers, status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*', // Vous pouvez restreindre à un domaine spécifique
      'Access-Control-Allow-Methods': 'OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
