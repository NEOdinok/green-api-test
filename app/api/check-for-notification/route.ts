import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: Request) {
  try {
		const params = await req.json();

		let config = {
			method: 'GET',
			maxBodyLength: Infinity,
			url: `https://${params.apiUrl}/waInstance${params.id}/receiveNotification/${params.apiToken}`,
		};

    const response = await axios.request(config);
    return NextResponse.json(response.data);
	} catch (error) {
    console.warn({ error });
	}
}
