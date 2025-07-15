type Props = {
  children?: React.ReactNode;
};

const ContainerNews = ({ children }: Props) => {
  return   <section
  className="bg-beige px-30 py-10"
  >
    <div
    className=" mb-6 font-bold text-5xl"
    >
      <h1>News</h1>
    </div>
    <div 
    className="flex flex-wrap space-x-6 space-y-6 justify-center"
    >
      {children}
    </div>
  </section>
};

export default ContainerNews;