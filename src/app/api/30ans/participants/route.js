// app/api/30ans/participants/route.js
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(request) {
  const eventId = process.env.EVENTMAKER_EVENT_ID;
  const authToken = process.env.EVENTMAKER_AUTH_TOKEN;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const companyName = searchParams.get('company_name');
  const status = searchParams.get('status');

  try {
    const response = await fetch(`https://app.eventmaker.io/api/v1/events/${eventId}/guests.json?auth_token=${authToken}&search=${search}`);
    const data = await response.json();

    console.log('Data received from Eventmaker API:', data); // Vérifier les données reçues

    const filteredParticipants = data.filter(participant =>
      (!status || participant.status === status) &&
      // !participant.label_ids.includes('665785e97a1b610094119514') &&
      (companyName ? participant.company_name === companyName : true)
    );

    // console.log('Filtered participants:', filteredParticipants); // Vérifier les participants filtrés

    return NextResponse.json(filteredParticipants);
  } catch (error) {
    console.error('Error fetching participants:', error);
    return NextResponse.json({ error: 'Error fetching participants' }, { status: 500 });
  }
}
