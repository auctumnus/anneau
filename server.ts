import config_ from "./ring.json";
import express from "express";
import { z } from "zod";

const configSchema = z.object({
  meta: z.object({
    home: z.string().url(),
    name: z.string(),
    summary: z.string(),
    description: z.string(),
  }),
  sites: z.array(
    z.object({
      username: z.string(),
      url: z.string().url(),
    }),
  ),
});

const { meta, sites } = configSchema.parse(config_);

const PORT = Number(process.env.PORT);
if (isNaN(PORT)) {
  console.error("PORT is not a number");
  process.exit(1);
}

const app = express();
app.set("view engine", "ejs");
app.use("/static", express.static("static"));

app.get("/", (_, res) => {
  res.render("index", { sites, meta });
});

app.get("/ring", (req, res) => {
  const { username } = req.query;

  if (typeof username !== "string") {
    res.render("error", { error: "no username provided", meta });
    return "";
  }

  const siteIndex = sites.findIndex((site) => site.username === username);

  if (siteIndex === -1) {
    res.render("error", {
      error: `no site found by given username "${username}"`,
      meta,
    });
    return "";
  }

  const site = sites[siteIndex];

  const previousSite = sites.at(siteIndex - 1);
  const nextSite = sites.at((siteIndex + 1) % sites.length);
  const randomSite = sites[Math.floor(Math.random() * sites.length)];

  res.render("ring", { site, previousSite, nextSite, randomSite, meta });
});

app.get("/test", (_, res) => {
  res.render("test", { sites });
});

app.use((err, _, res, __) => {
  if (err) {
    console.error(err);
    res.render("error", { error: "internal server error", meta });
  } else {
    res.render("404");
  }
});

app.get("*", (_, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
