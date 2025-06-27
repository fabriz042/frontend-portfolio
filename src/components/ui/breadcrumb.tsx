"use client";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";

const Breadcrumb = () => {
  const pathname = usePathname();
  return (
    <div className="text-grande">
      <Container>Inicio{pathname}</Container>
    </div>
  );
};
export default Breadcrumb;
