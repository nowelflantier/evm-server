import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('eventId');
  const participantId = searchParams.get('participantId');
  const { auth_token, newData } = await req.json();

  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'OPTIONS, PUT');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const response = await fetch(`https://app.eventmaker.io/api/v1/events/${eventId}/guests/${participantId}.json&auth_token=${auth_token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return NextResponse.json(data, { headers, status: response.status });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du participant', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { headers, status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
