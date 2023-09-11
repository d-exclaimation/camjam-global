import { kv } from "./lib/kv.ts";

const date = new Date();
const day = date.toISOString().split("T")[0];
await kv.delete(["daily", day]);
