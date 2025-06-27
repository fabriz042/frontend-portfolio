import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Busqueda from "@/components/Busqueda";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import Breadcrumb from "@/components/ui/breadcrumb";

const Header = () => {
  return (
    <header>
      <Container>
        <div className="border-yellow-500 border-2 w-full flex">
          <div className="w-[190px] border-green-500 border-2">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={100}
              />
            </Link>
          </div>
          <div className="border-red-500 border-2 w-full flex items-center">
            <Busqueda />
          </div>
          <div className="border-blue-500 border-2 flex items-center">
            <div>
              <AiOutlineShoppingCart className="text-black h-[40px] w-[40px] mr-2 ml-2" />
            </div>
            <div>
              <AiOutlineUser className="text-black h-[40px] w-[40px] mr-2" />
            </div>
            <div>
              <AiOutlineHeart className="text-black h-[40px] w-[40px] mr-2" />
            </div>
          </div>
        </div>

        {/*NAV */}
        <nav className="border-white border-2 w-full relative">
          <div className="bg-colorOscuro flex z-20">
            <div className="group">
              {/*Menu-Categorias */}
              <div className="text-textBlanco p-2 text-center cursor-pointer border-red-500 border-2 w-[100px]">
                Categorias
              </div>

              <div className="absolute text-textBlanco hidden group-hover:block bg-colorOscuro p-4 w-full z-20 left-0 ">
                <ul>
                  <li className="">Categoria 1</li>
                  <li className="">Categoria 2</li>
                  <li className="">Categoria 3</li>
                  <li className="">Categoria 4</li>
                </ul>
                <div className="bg-slate-400">Ver todos los productos</div>
              </div>
            </div>

            {/*Menu-Deportes */}
            <div className="group">
              <div className="text-textBlanco p-2 text-center cursor-pointer border-red-500 border-2 w-[100px] ">
                Deportes
              </div>

              <div className="absolute text-textBlanco hidden group-hover:block bg-colorOscuro p-4 z-20 w-full left-0 ">
                <ul>
                  <li className="">Deporte 1</li>
                  <li className="">Deporte 2</li>
                  <li className="">Deporte 3</li>
                  <li className="">Deporte 4</li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </Container>
      <Breadcrumb />
    </header>
  );
};

export default Header;
