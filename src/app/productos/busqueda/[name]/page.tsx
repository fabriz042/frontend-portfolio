"use client";
//Librerias
import { getlistaBusqueda } from "@/services/products/product.service";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
//Iconos
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
//Componentes
import Checkbox from "@/components/ui/checkbox";
import Container from "@/components/Container";
import Producto from "@/components/Producto";

interface Producto {
  nombre: string;
  precio: number;
  slug: string;
  estado__nombre: string;
}
interface ProductosData {
  count_total: number;
  num_pages: number;
  productos: Producto[];
}

interface EstadoFiltro {
  id: number;
  nombre: string;
}

const Busqueda = () => {
  const estados: EstadoFiltro[] = [
    { id: 1, nombre: "En stock" },
    { id: 2, nombre: "En camino" },
    { id: 3, nombre: "A pedido" },
    { id: 4, nombre: "Pre-Orden" },
  ];

  const [productosData, setProductos] = useState<ProductosData>({
    count_total: 0,
    num_pages: 0,
    productos: [],
  });

  const [isDesplegableOpen, setIsDesplegableOpen] = useState(true); // Estado para controlar el desplegable
  const handleDesplegable = () => {
    setIsDesplegableOpen(!isDesplegableOpen); // Alterna entre abierto y cerrado
  };

  const pathname = usePathname(); // Obtiene "/busqueda/guante"
  const searchParams = useSearchParams(); // Obtiene "?estado=1&marca=2"

  // Extrae el nombre del producto de la URL y los parámetros de búsqueda
  const name = pathname.split("/").pop() || ""; // Extrae "guante" o usa una cadena vacía como valor predeterminado
  const [estado, setEstado] = useState(Number);
  const [selectedEstado, setSelectedEstado] = useState<number | null>(null);
  const marca = searchParams.get("marca") || "";
  const [page, setPage] = useState(1);

  // Manejo de la paginación
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= productosData.num_pages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEstadoClick = (estadoId: number) => {
    if (estadoId === selectedEstado) {
      // Si el estado ya está seleccionado, lo deselecciona
      setSelectedEstado(null);
      setEstado(0); // Cambia el estado a 0 o un valor que indique "sin filtro"
    } else {
      // Si el estado no está seleccionado, lo selecciona
      setPage(1); // Reinicia la paginación al seleccionar un nuevo estado
      setEstado(estadoId);
      setSelectedEstado(estadoId);
    }
  };

  useEffect(() => {
    console.log("Buscando:", name, estado, marca);

    const fetchProductos = async () => {
      try {
        const data = await getlistaBusqueda({
          name,
          page,
          limit: 5,
          estado,
          marca,
        });
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
      }
    };

    fetchProductos();
  }, [name, estado, marca, page]);

  return (
    <div>
      <Container>
        {/* Seccion resultado */}
        <div className="bg-fondoBlanco rounded-[30px]">
          <div className="border-red-500 border-2 p-4 flex items-center">
            <div className="text-2xl">Resultados para:</div>
            <div className="font-bold text-3xl pl-3">{name}</div>
          </div>

          <div className="flex justify-between">
            {/* ---------Columna Filtros */}
            <div className="border-black border-2 w-[250] p-3 gap-4 flex flex-col bg-white rounded-2xl">
              {/* Seccion Titulo */}
              <div className="text-3xl text-center">Filtros</div>

              {/* Seccion Filtro de estados */}
              <div className="border-b-2 border-gray-500 pb-2 mb-2">
                <div
                  onClick={handleDesplegable}
                  className="font-bold flex items-center gap-1 cursor-pointer select-none"
                >
                  <div>Estado</div>
                  <div>
                    {isDesplegableOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                </div>
                {isDesplegableOpen && (
                  <div className="ml-4">
                    <ul>
                      {estados.map((estado) => (
                        <li
                          key={estado.id}
                          className={`cursor-pointer hover:bg-gray-100 select-none p-1 transition-all duration-200 ${
                            selectedEstado === estado.id
                              ? "font-bold pl-5 text-textLink"
                              : ""
                          }`}
                          onClick={() => handleEstadoClick(estado.id)}
                        >
                          {estado.nombre}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Seccion Filtro de eso */}
              <div>
                <div className="font-bold flex items-center gap-1 cursor-pointer select-none">
                  Eso
                </div>
                <Checkbox label="Marca 1" />
              </div>
            </div>

            {/* -------Columna Busqueda */}
            <div className="flex flex-col w-full">
              {/* Total productos y ordenar por*/}
              <div className="flex items-center justify-between border-gray-500 border-2 px-5">
                <div className="text-xl p-3">
                  <span className="font-bold">{productosData.count_total}</span>{" "}
                  productos encontrados
                </div>
                <div>
                  <select
                    name="ordenar"
                    id="ordenar"
                    className="border p-2 rounded"
                  >
                    <option value="">Ordenar por:</option>
                    <option value="precio-asc">Precio: menor a mayor</option>
                    <option value="precio-desc">Precio: mayor a menor</option>
                    <option value="nombre-asc">Lo mas nuevo</option>
                    <option value="nombre-desc">Lo mas antiguo</option>
                  </select>
                </div>
              </div>

              <div className="border-gray-500 border-2 w-full flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 border-green-500 border-2 ">
                  {productosData.count_total === 0 ? (
                    <p>No se encontraron productos</p>
                  ) : (
                    Array.isArray(productosData.productos) &&
                    productosData.productos.map((producto, index) => (
                      <Producto
                        key={index}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        estado={producto.estado__nombre}
                        slug={producto.slug}
                      />
                    ))
                  )}
                </div>
              </div>
              {productosData.count_total !== 0 && (
                <div className="border-red-500 border-2 text-xl p-2 text-center mt-10">
                  <div className="flex justify-center items-center gap-4">
                    <div
                      onClick={() => handlePageChange(page - 1)}
                      className={`cursor-pointer ${
                        page === 1 ? "opacity-0 pointer-events-none" : ""
                      } transition-opacity duration-400 ease-in-out`}
                    >
                      <IoIosArrowBack size={35} />
                    </div>
                    <div className="text-2xl">
                      Pagina {page} de {productosData.num_pages}
                    </div>
                    <div
                      onClick={() => handlePageChange(page + 1)}
                      className={`cursor-pointer ${
                        page === productosData.num_pages
                          ? "opacity-0 pointer-events-none"
                          : ""
                      } transition-opacity duration-400 ease-in-out`}
                    >
                      <IoIosArrowForward size={35} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Busqueda;
