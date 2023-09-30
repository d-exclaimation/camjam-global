import { router } from "https://deno.land/x/rutt@0.1.0/mod.ts";
import { json } from "./lib/cors.ts";
import { Preset, all, preset } from "./lib/game.ts";
import { kv } from "./lib/kv.ts";

Deno.serve(
  router({
    "/": () => new Response("OK"),
    "/oftheday": async (req) => {
      const date = new Date();
      const day = date.toISOString().split("T")[0];
      const entry = await kv.get<ReturnType<Preset["get"]>>(["daily", day]);
      if (entry.value) {
        return json(req, entry.value);
      }
      const curr = preset();

      console.log(`${curr.name}`);

      const value = curr.get();
      await kv.set(["daily", day], { ...value, day });
      return json(req, value);
    },
    "/lib": (req) => {
      return json(req, all);
    },
    "/random": (req) => {
      const curr = preset();
      console.log(`${curr.name}`);
      const value = curr.get();
      return json(req, value);
    },
  })
);
