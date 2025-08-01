import { GoogleOutlined} from '@ant-design/icons';
import {signIn} from '@/auth';

export const GoogleButton = () => {
  return (
    <form action={async () => { 
      "use server";
      await signIn("google",{redirectTo: "/"});
    }}>
      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <GoogleOutlined className="mr-2" />
        Sign in with Google
      </button>
    </form>
  );
};