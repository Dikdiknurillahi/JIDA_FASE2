import pool from '@/interface/pool';;
import { NextResponse } from 'next/server'; // Import NextResponse

export async function GET() { 
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

export async function POST(request: Request) {
    let client;
    try {
        client = await pool.connect();
        const { sayur_category_id, daerah_id, harga, tanggal } = await request.json();

        // Validasi data yang diterima
        if (typeof sayur_category_id !== 'number' || typeof daerah_id !== 'number' || typeof harga !== 'number') {
            return NextResponse.json(
                { message: 'Invalid input: sayur_category_id, daerah_id, and harga must be numbers.' },
                { status: 400 }
            );
        }
        if (harga <= 0) {
            return NextResponse.json({ message: 'Harga harus lebih dari 0.' }, { status: 400 });
        }

        // Query INSERT
        const query = `
            INSERT INTO pertanian.harga_sayuran (sayur_category_id, daerah_id, harga, tanggal)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [sayur_category_id, daerah_id, harga, tanggal || new Date().toISOString().split('T')[0]];
        // Jika 'tanggal' tidak disediakan, gunakan tanggal hari ini

        const result = await client.query(query, values);

        return NextResponse.json(
            { message: 'Data harga sayuran berhasil ditambahkan!', data: result.rows[0] },
            { status: 201 } // Status 201 Created
        );

    } catch (error: any) {
        console.error('Error adding data:', error);
        return NextResponse.json(
            { error: 'Gagal menambahkan data harga sayuran.', details: error.message },
            { status: 500 }
        );
    } finally {
        if (client) {
            client.release();
        }
    }
}

export async function PUT(request: Request) {
  let client;
  try {
    client = await pool.connect();
    const { id, harga, tanggal } = await request.json();

    if (typeof id !== 'number' || typeof harga !== 'number') {
      return NextResponse.json(
        { message: 'Invalid input: id dan harga harus berupa angka.' },
        { status: 400 }
      );
    }

    const query = `
      UPDATE pertanian.harga_sayuran
      SET harga = $2, tanggal = $3
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id, harga, tanggal || new Date().toISOString().split('T')[0]];

    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: 'Data tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Data harga sayuran berhasil diupdate!', data: result.rows[0] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating data:', error);
    return NextResponse.json(
      { error: 'Gagal update data harga sayuran.', details: error.message },
      { status: 500 }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function DELETE(request: Request) {
    let client;
    try {
        client = await pool.connect();
        const { id } = await request.json();

        if (typeof id !== 'number') {
            return NextResponse.json(
                { message: 'Invalid input: id harus berupa angka.' },
                { status: 400 }
            );
        }

        const query = `DELETE FROM pertanian.harga_sayuran WHERE id = $1 RETURNING *;`;
        const result = await client.query(query, [id]);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { message: 'Data tidak ditemukan atau sudah dihapus.' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Data harga sayuran berhasil dihapus!', data: result.rows[0] },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting data:', error);
        return NextResponse.json(
            { error: 'Gagal menghapus data harga sayuran.', details: error.message },
            { status: 500 }
        );
    } finally {
        if (client) {
            client.release();
        }
    }
}
// ...existing code...