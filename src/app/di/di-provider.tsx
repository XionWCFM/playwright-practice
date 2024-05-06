"use client";
import { ExampleApiProvider, createExampleApiService } from "~/src/entities/example";
import { builder } from "~/src/package/composition/builder";

export const DiProvider = builder.tree([
  builder.provider(ExampleApiProvider, { value: createExampleApiService(fetch) }),
]);
