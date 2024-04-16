"use client";
import Image from "next/image";
import { useExampleContext } from "~/src/entities/example";
import { fetcher } from "~/src/shared/di/api-service.class";

export default function Home() {
  const service = useExampleContext();
  const hi = fetcher(fetch);
  return (
    <main>
      dsa
      <button
        onClick={async () => {
          const result = await service.getExample();
          console.log(result);
        }}
      >
        하이
      </button>
      <button onClick={() => hi("api")}> 클릭하면</button>
    </main>
  );
}
