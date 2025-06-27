import Image from "next/image";

const Footer = () => {
  const IconMetodo = ["yape", "plin", "bcp", "inter"];

  return (
    <footer className="border-[5px] border-green-400">
      <div className="mt-20">
        <div className="bg-colorOscuro w-full h-[500px]">
          <div className="border-red-500 border-2 ">
            <div className="text-white">Contacto</div>
          </div>

          <div className="flex border-yellow-500 border-2 ">
            {IconMetodo.map((nombre, index) => (
              <div
                key={index}
                className="w-[60px] h-[60px] rounded-[10px] overflow-hidden m-1"
              >
                <Image
                  src={`/images/${nombre}.png`}
                  alt={nombre}
                  width={60}
                  height={60}
                  className="w-full h-full object-cover transition-all duration-300 brightness-50 hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#060707] w-full h-[35px]">
          <p className="text-center mr-4 text-white p-1">Media Company 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
