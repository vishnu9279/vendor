const CardProps = ({ Img, Dots }) => {
  return (
    <div>
      <div className="w-[230px] h-[120px] bg-white pt-[10px] shadow-lg rounded-md m-[15px] mt-[5px] ml-[0] pb-[30px] px-[20px]">
        <div className="flex justify-between items-center mb-[20px]">
          <div>
            <h1 className="font-bold text-[25px]">11,500</h1>
            <p className="text-[13px] font-medium">Total Users</p>
          </div>
          <div className="w-[40px] h-[40px] rounded-md bg-[#80d7421a] flex justify-center items-center text-[#81D742]">
            <img src={Img} alt="" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[50px] h-[20px] rounded-md bg-[#80d7421a] flex justify-center items-center text-[#81D742] font-bold">
            <p>+5.9%</p>
          </div>
          <div>
            <img src={Dots} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProps;
