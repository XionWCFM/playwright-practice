"use client";
import Image from "next/image";
import { useExampleContext } from "~/src/entities/example";

export default function Home() {
  const service = useExampleContext();
  return (
    <main>
      dsa
      <button
        onClick={() => {
          service.getExample();
        }}
      >
        하이
      </button>
    </main>
  );
}
