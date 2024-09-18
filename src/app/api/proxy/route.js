// Import necessary modules
import { NextResponse } from 'next/server';

// Define the POST method handler
export async function POST(request) {
  try {
    // Parse the JSON body of the incoming request
    const { instruction } = await request.json();

    // Make a POST request to the external API (vakilbot)
    const res = await fetch('https://vakilbot.loca.lt/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ instruction }),
    });

    // Parse the JSON response from the external API
    const data = await res.json();

    // Return the JSON response from the external API
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/proxy route:", error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
