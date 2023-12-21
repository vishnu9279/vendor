import Charts from "./pages/Charts";
import Recents from "./pages/Recents";

const Second = () => {
  return (
    <div className="w-[100%] flex mt-[30px] p-[30px] flex-wrap">
      <div className="w-[50%] h-[100%] mr-[30px] max-er:w-full">
        <Charts />
      </div>
      <div className="w-[40%] max-er:w-full">
        <Recents />
      </div>
    </div>
  );
};

export default Second;
