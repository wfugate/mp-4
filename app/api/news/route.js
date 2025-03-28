import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.CURRENTS_API_KEY;
    try {
        const response = await fetch(
            `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&country=US`
        );
        if (response.status === 429 || response.status === 403) {
            return NextResponse.json(
                {
                    error: 'API quota exceeded',
                    message: 'You have reached your maximum API request limit'
                },
                { status: response.status }
            );
        }

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch news stories' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
    }
}
