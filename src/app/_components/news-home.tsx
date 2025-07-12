import { Article } from "@/interface/news";
import { getNewApi } from "@/lib/Api";

export default async function News() {
  let news: Article[] = [];
  let errorMessage: String | null = null;

  try {
    news = await getNewApi();
  } catch (error: any) {
    errorMessage = error.message;
  }

    if (errorMessage) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h1>Oops! Ada Masalah</h1>
        <p>{errorMessage}</p>
        <p>Silakan coba refresh halaman atau periksa konfigurasi API Key Anda.</p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Berita Pertanian</h1>
        <p>Tidak ada berita pertanian ditemukan saat ini.</p>
        <p>Coba lagi nanti atau periksa koneksi internet Anda.</p>
      </div>
    );
  }

  return (
<div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Berita Pertanian Terbaru</h1>
      <hr style={{ borderColor: '#eee', margin: '20px 0' }} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {news.map((news) => (
          <li key={news.url} style={{ marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            {news.urlToImage && (
              <img
                src={news.urlToImage}
                alt={news.title}
                style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
              />
            )}
            <div style={{ padding: '15px' }}>
              <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#0070f3', ':hover': { textDecoration: 'underline' } }}
                >
                  {news.title}
                </a>
              </h2>
              <p style={{ fontSize: '0.9em', color: '#555', lineHeight: '1.5' }}>{news.description}</p>
              <p style={{ fontSize: '0.8em', color: '#777', marginTop: '10px' }}>Sumber: {news.source.name} | Tanggal: {new Date(news.publishedAt).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}