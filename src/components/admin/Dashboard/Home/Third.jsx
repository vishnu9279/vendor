import Table2 from "./pages/Table2";
import Tables from "./pages/Tables";

const Third = () => {
  return (
    <div className="mt-[50px]">
      <div className="hidden sm:hidden md:hidden lg:flex">
        <Tables />
      </div>
      <div className="xm:flex sm:flex md:hidden lg:hidden">
        <Table2 />
      </div>
    </div>
  );
};

export default Third;
