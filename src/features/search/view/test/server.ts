import { rest } from "msw";
import { setupServer } from "msw/node";

import { mockData } from "./mock";

export const record = "somerecords"

export const server = setupServer(
  rest.get("https://itunes.apple.com/search", (req, res, ctx) => {
    return res(ctx.json(req.url.search.includes(record)? mockData : {...mockData, results: []}));
  })
);
