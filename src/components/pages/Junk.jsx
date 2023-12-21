import { useNavigate } from "react-router-dom";
import junk_bg from "../../assets/PNG/junk-bg.png";


const Junk = () => {
  const navigate = useNavigate()
  return (
    <main className="lg:pt-40 lg:px-8 flex justify-center items-center">
      <section className="grid grid-cols-1 lg:grid-cols-2 justify-around mx-5 px-4 md:px-0 lg:mx-14 text-zinc-500">
        <div className="lg:px-10 py-5 order-2 lg:order-1">
          <div className="text-black">
            <h1 className="text-3xl lg:text-4xl font-bold font-['Gilroy-Regular'] leading-tight">
              Shop Junk: Your Eco-Friendly Marketplace Feature
            </h1>
          </div>
          <div>
            <p className="lg:max-w-[450px]">
              Registering with JunkBazar has never been easier. Join us as a
              partner today and discover the endless possibilities!
            </p>
          </div>
          <div className="hidden lg:flex justify-center lg:justify-start items-center">
            <button onClick={() => navigate("/upload-scrap")} className="text-center text-white text-base font-semibold tracking-tight bg-lime-400 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-6 py-[.65rem]">
             Sell your scrap
            </button>
           
          </div>
        </div>

        <aside className="order-1 lg:order-2 mt-10 lg:mt-0">
          <section>
            <img src={junk_bg} alt="junk-img" />
          </section>
        </aside>
      </section>
    </main>
  );
};

export default Junk;
