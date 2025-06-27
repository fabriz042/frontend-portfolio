import axios from "axios";
// Usa la variable de entorno o un valor por defecto
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Creamos la instancia de axios con la configuración base
const api = axios.create({
  baseURL, // URL base desde variable de entorno o valor por defecto
  timeout: 15000, // 15 segundos de timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Log de la URL base
console.log("Base URL:", process.env.NEXT_PUBLIC_API_URL);

export default api;
