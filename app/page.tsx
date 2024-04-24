"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useExampleContext } from "~/src/entities/example";
import { useInternalRouter } from "~/src/package/router/use-internal-router";
import { fetcher } from "~/src/shared/di/api-service.class";
import Portal from "~/src/shared/ui/portal";

export default function Home() {
  const service = useExampleContext();
  const hi = fetcher(fetch);
  const [isLoading, setIsLoading] = useState(false);
  const router = useInternalRouter();
  console.log(router);
  return (
    <main>
      <button
        onClick={async () => {
          setIsLoading(true);

          await new Promise((res) => setTimeout(res, 200));
          router.push("/new-page");
          await new Promise((res) => setTimeout(res, 200));

          setIsLoading(false);
        }}
      >
        누르면 로딩
      </button>
      <Portal>
        {isLoading ? (
          <div className=" fixed top-0 left-0 w-screen h-screen bg-neutral-200 backdrop-blur-sm z-10"></div>
        ) : null}
      </Portal>
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
