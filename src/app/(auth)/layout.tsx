const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 mt-20">
      <div className="flex flex-col items-center justify-between min-h-screen px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow mt-0 max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;