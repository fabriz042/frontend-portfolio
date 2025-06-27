"use client";
import Container from "@/components/Container";
import ChatCompo from "@/components/ChatCompo";

export default function Home() {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
  ];

  return (
    <div>
      <Container>
        <ChatCompo />
        <div className="h-[500px]">a</div>
      </Container>
      <div className="bg-gray-500 border-2 w-full h-[250px] overflow-hidden">
        <div className="flex animate-scroll">
          {[...items, ...items, ...items].map((item, index) => (
            <div key={index} className="bg-red-100 p-10 m-10">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
