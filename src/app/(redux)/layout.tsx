import '@/app/globals.css';
import { ReduxProvider } from '@/app/_components/redux/ReduxProvider';

export const metadata = {
  title: 'Todo Redux App',
};

export default function RootLayout({children }: { children: React.ReactNode }) {
  return (
        <div className="bg-gray-100 mt-20">
      <div className="flex flex-col items-center justify-between min-h-screen px-6 py-8 mx-auto">
        <div className="bg-white rounded-lg shadow mt-0 w-md flex justify-center">
      <ReduxProvider>{children}</ReduxProvider>
        </div>
      </div>
    </div>
  );
}
