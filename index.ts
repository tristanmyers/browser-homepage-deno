import { serve } from "https://deno.land/std@0.147.0/http/server.ts";
import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";
import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.149.0/http/file_server.ts";

import { app } from "./views/app.tsx";

type ResponseData = {
  body: BodyInit;
  status: number;
  contentType: string;
};

const port = 8000;

await serve(handler, { port });

function handler(req: Request): Response {

  const resData: ResponseData = {
    body: "Internal server error",
    status: 500,
    contentType: "text/html",
  };

  const reqUrl = new URL(req.url);

  switch (reqUrl.pathname) {
    case "/":
      if (req.method === "GET") {
        resData.body = renderToString(app());
        resData.status = 200;
      }
      break;

    default:
      resData.body = "Page not found";
      resData.status = 404;
      break;
  }

  serveDir(req, {fsRoot: "./public/styles/"});
  return new Response(resData.body, {
    status: resData.status,
    headers: {
      "content-type": resData.contentType,
    },
  });
}
