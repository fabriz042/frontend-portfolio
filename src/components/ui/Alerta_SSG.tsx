"use client"; // Ahora es un componente cliente

import { useState } from "react";

export default function ClienteComponent() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div>
      <p
        className="cursor-pointer text-blue-500 "
        onClick={() => setMostrar(!mostrar)}
      >
        Metodos de envio
      </p>

      {mostrar && (
        <div className="border-gray-500 border-2 absolute mt-2 p-4 bg-white rounded shadow">
          <p>Olva Courier</p>
          <p>Shalom</p>
        </div>
      )}
    </div>
  );
}
