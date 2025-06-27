import api from "@/services/api.service";

interface Busqueda {
  name: string;
  limit?: number;
  page?: number | 1;
  estado?: number;
  marca?: string;
}

export const getlistaBusqueda = async ({
  name,
  limit,
  estado,
  page,
}: Busqueda) => {
  try {
    const params = new URLSearchParams();
    params.append("name", name);
    if (limit) params.append("limit", limit.toString());
    if (estado) params.append("estado", estado.toString());
    if (page) params.append("page", page.toString());

    const response = await api.get(`busqueda/?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de busqueda", error);
    throw error;
  }
};

export const getDetalles = async (slug: string) => {
  try {
    const response = await api.get(`productos/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el detalle", error);
    throw error;
  }
};
