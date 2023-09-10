import { router } from "https://deno.land/x/rutt@0.1.0/mod.ts";
import { random } from "./lib/game.ts";
import { kv } from "./lib/kv.ts";

Deno.serve(
  router({
    "/": () => new Response("OK"),
    "/oftheday": async () => {
      const date = new Date();
      const day = date.toISOString().split("T")[0];
      const entry = await kv.get<ReturnType<typeof random>>(["daily", day]);
      if (entry.value) {
        return Response.json(entry.value);
      }
      const value = random();
      await kv.set(["daily", day], value);
      return Response.json(value);
    },
  })
);
