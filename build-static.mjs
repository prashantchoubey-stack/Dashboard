import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname);
const files = {
  "/": ["public/dashboard.html", "text/html; charset=utf-8"],
  "/dashboard.html": ["public/dashboard.html", "text/html; charset=utf-8"],
  "/dashboard.css": ["public/dashboard.css", "text/css; charset=utf-8"],
  "/dashboard.js": ["public/dashboard.js", "text/javascript; charset=utf-8"],
};
const assets = {};
for (const [route, [path, type]] of Object.entries(files)) assets[route] = { body: await readFile(resolve(root, path), "utf8"), type };
const worker = `const assets=${JSON.stringify(assets)};export default{async fetch(request){const url=new URL(request.url);const asset=assets[url.pathname]||assets["/"];return new Response(asset.body,{headers:{"content-type":asset.type,"cache-control":url.pathname==="/"?"no-cache":"public, max-age=3600","x-content-type-options":"nosniff"}})}};`;
await mkdir(resolve(root, "dist/server"), { recursive: true });
await writeFile(resolve(root, "dist/server/index.js"), worker);
console.log("Static worker build complete: dist/server/index.js");
