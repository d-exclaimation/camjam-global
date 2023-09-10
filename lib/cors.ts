const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://camjam.d-exclaimation.me",
  "https://camjam.talker.dev",
  "https://camjam-ai.vercel.app",
];
export function cors(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin");
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, X-Authorization",
  };
}
