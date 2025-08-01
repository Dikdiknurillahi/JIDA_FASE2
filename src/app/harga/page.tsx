import { Container } from '@/app/_components/Container';
import Tabs from '../_components/tabs/tabs';

export default function HomePage() {
    return (
        <Container>
        <div className='mx-30 mb-5' 
            >
                <h1 className='text-3xl font-bold'
                >Data Harga Sayur Dari Berbagai Daerah</h1>
                <p>Data harga dibawah ini dari petani ke pengepul/Bandar sayur dari berbagai daerah.</p>
            </div>
            <Tabs />
        </Container>
    );
}