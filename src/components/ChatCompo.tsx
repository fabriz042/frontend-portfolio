const ChatCompo = () => {
  return (
    <div className="border-red-500 border-2 w-[350px] h-[500px]">
      <div className="border-red-500 border-2 w-full h-[90%] p-3">
        <div className="border-yellow-500 bg-white border-2 h-full w-full"></div>
      </div>
      <div className="border-red-500 border-2 w-full h-[10%] flex">
        <div className="border-yellow-500 border-2 w-[80%] p-1">
          <input type="text" className="h-full w-full pl-2" />
        </div>
        <div className="border-yellow-500 border-2 w-[20%]">a</div>
      </div>
    </div>
  );
};

export default ChatCompo;
