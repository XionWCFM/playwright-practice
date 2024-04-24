"use client";

import { Routes } from "~/src/package/router/routes";

export default function Home() {
  const router = Routes.home.useRouter();

  return (
    <main>
      <button onClick={() => {}}>온클릭시 이동</button>
    </main>
  );
}
