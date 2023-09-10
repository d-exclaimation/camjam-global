/// <reference lib="deno.unstable" />

const KV_URL = Deno.env.get("DENO_KV_URL");

export const kv = await Deno.openKv(KV_URL);
