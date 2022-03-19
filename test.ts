import { Response } from "./src/lib/response";

(() => {
  const response = new Response(true).error(Error("start")).toJson();
  console.log(response);
})();