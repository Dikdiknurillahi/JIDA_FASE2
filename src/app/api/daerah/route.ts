import pool from '@/interface/pool';;
import { NextResponse } from 'next/server'; // Import NextResponse

export async function GET() { 
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
        SELECT* FROM pertanian.daerah
        `);
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error: unknown) {
        console.error('Error fetching data:', error);
                if (error instanceof Error) {
                return NextResponse.json({ error: 'Failed to fetch data', details: error.message }, { status: 500 });
            } else {
                return NextResponse.json("Terjadi kesalahan yang tidak diketahui", { status: 500 });
            }
    } finally {
        if (client) {
            client.release();
        }
    }
}