"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getlistaBusqueda } from "@/services/products/product.service";
import Image from "next/image";

const moneda = "s/. ";
const searchSuggestions = [
  "Guantes Rawlings",
  "Equipos deportivos",
  "Bolsa para beisbol",
];
const SearchBar = () => {
  // Lista para el placeholder

  interface Producto {
    nombre: string;
    precio: number;
    slug: string;
  }

  const handleBuscar = () => {
    setIsOpen(false);
  };

  //USEEFFECT para cerrar el cuadro de busqueda al hacer click fuera de el
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [estadoBusqueda, setEstadoBusqueda] = useState("");

  //CONST PARA LA BUSQUEDA Logica
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [productosData, setProductos] = useState<{
    count_total: number;
    productos: Producto[];
  }>({
    count_total: 0,
    productos: [],
  });
  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current?.contains(event.target as Node)) {
        if (search.trim() !== "") {
          // Si hay texto en el input, abre el cuadro de búsqueda
          setIsOpen(true);
        }
      } else {
        // Si el clic ocurre fuera del componente, cierra el cuadro de búsqueda
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, search, isOpen]);

  //USEFFECT para el retraso de la busqueda, evitar sobresaturar el api
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search); // Actualiza el valor después del delay
    }, 300); // Retraso de 500ms

    return () => {
      clearTimeout(handler); // Limpia el timeout si el usuario sigue escribiendo
    };
  }, [search]);

  //USEFFECT para la llamada al api
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setProductos({ count_total: 0, productos: [] });
        setEstadoBusqueda("Buscando...");
        const data = await getlistaBusqueda({
          name: debouncedSearch,
          limit: 4,
        });

        setProductos(data);
        setEstadoBusqueda(
          data.count_total === 0
            ? "No se encontraron productos"
            : `Ver los ${data.count_total} productos encontrados ->`
        );
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
      }
    };
    if (debouncedSearch.trim() !== "") {
      fetchProductos();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch]);

  //Efecto tipado para el placeholder-----------------------------------------------------------------
  const [placeholderText, setPlaceholderText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);
  useEffect(() => {
    if (inputFocused) return;
    const currentSuggestion = searchSuggestions[currentSuggestionIndex];

    if (isTyping) {
      if (placeholderText.length < currentSuggestion.length) {
        const timer = setTimeout(() => {
          setPlaceholderText(
            currentSuggestion.substring(0, placeholderText.length + 1)
          );
        }, 70); //Tiempo de escritura
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else {
      if (placeholderText.length > 0) {
        const timer = setTimeout(() => {
          setPlaceholderText(
            currentSuggestion.substring(0, placeholderText.length - 1)
          );
        }, 25); //Tiempo de borrado
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentSuggestionIndex(
            (prevIndex) => (prevIndex + 1) % searchSuggestions.length
          );
          setIsTyping(true);
        }, 300); //Tiempo de pensando
        return () => clearTimeout(timer);
      }
    }
  }, [placeholderText, isTyping, currentSuggestionIndex, inputFocused]);

  return (
    <div className="w-full flex relative mr-5 ml-5" ref={ref}>
      <div className="w-full flex">
        <input
          className={`h-[60px] w-full ${
            isOpen ? "rounded-t-[30px]" : "rounded-[30px]"
          } text-xl pl-[30px] pr-[70px] text-black focus:outline-none `}
          type="text"
          placeholder={placeholderText}
          onFocus={() => {
            setInputFocused(true);
            setPlaceholderText(""); // Clear the placeholder text
          }}
          onBlur={() => {
            if (!search) {
            }
            const timer = setTimeout(() => {
              setInputFocused(false);
            }, 700);
            return () => clearTimeout(timer);
          }}
          required
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="cursor-pointer" onClick={() => setSearch("")}>
          <Link
            href={search ? `/busqueda/${search}` : "#"}
            onClick={handleBuscar}
          >
            <AiOutlineSearch className="text-black h-[40px] w-[40px] ml-[-60px] mt-2" />
          </Link>
        </div>
      </div>

      <div
        className="bg-white absolute w-full mt-[60px] p-3 z-20 rounded-b-[30px]"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {productosData.productos.map(({ nombre, precio, slug }) => (
          <Link href={`/productos/categoria/${slug}`} key={slug}>
            <div
              className="flex gap-4 rounded-lg p-3 m-2 border-2 border-black-500 cursor-pointer bg-slate-200 hover:bg-slate-300 shadow-sm"
              onClick={handleBuscar}
            >
              <div className="border-red-500 border-2 col-start-3 h-[100] w-[100] items center flex bg-white">
                <Image
                  src={`/productos/${slug}/1.webp`}
                  alt="Ejemplo de imagen optimizada"
                  width={100}
                  height={100}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              <div className="border-black border-2 col-start-4 text-2xl">
                {nombre}
              </div>
              <div className="border-green-500 border-2 col-start-6 text-2xl ml-auto">
                {moneda}
                {precio.toLocaleString("en-US")}
              </div>
            </div>
          </Link>
        ))}

        {/* Enlace para ver todos los resultados */}
        <Link href={`/busqueda/${search}`}>
          <div
            className="text-right cursor-pointer"
            onClick={handleBuscar} // Llama a handleBuscar antes de navegar
          >
            <div className="p-2">
              <p>{estadoBusqueda}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
