import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: Request) {
  try {
		const params = await req.json();

		let config = {
			method: 'GET',
			maxBodyLength: Infinity,
			// url: 'https://api.green-api.com/waInstance1101825531/receiveNotification/f3e7db6cbbfd4d1da50fa4764f1c96fc64c94432bc4f41debd',
			url: `https://${params.apiUrl}/waInstance${params.id}/receiveNotification/${params.apiToken}`,
		};

    const response = await axios.request(config);
    return NextResponse.json(response.data);
	} catch (error) {
    console.warn({ error });
	}
}
