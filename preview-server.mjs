import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
const root=resolve(import.meta.dirname,"public"),types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8"};
createServer(async(req,res)=>{try{const path=req.url==="/"?"dashboard.html":req.url.slice(1);const body=await readFile(resolve(root,path));res.writeHead(200,{"content-type":types[extname(path)]||"application/octet-stream"});res.end(body)}catch{res.writeHead(404);res.end("Not found")}}).listen(4173,"127.0.0.1",()=>console.log("Local: http://127.0.0.1:4173"));
