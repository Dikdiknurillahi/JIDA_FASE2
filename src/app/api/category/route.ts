import pool from '@/interface/pool';;
import { NextResponse } from 'next/server'; // Import NextResponse

export async function GET() { 
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
        SELECT* FROM pertanian.sayur_category
        `);
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data', details: error.message }, { status: 500 });
    } finally {
        if (client) {
            client.release();
        }
    }
}