import { Pool } from 'pg';
import { NextResponse } from 'next/server'; // Import NextResponse

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET(request: Request) { 
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
        SELECT
                hs.*,
                d.nama_daerah,
                sc.nama_sayur
            FROM
                pertanian.harga_sayuran hs
            JOIN
                pertanian.daerah d ON hs.daerah_id = d.id
            JOIN
                pertanian.sayur_category sc ON hs.sayur_category_id = sc.id
            LIMIT 10;  
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