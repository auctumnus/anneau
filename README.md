# anneau 💍

simple webring software

## configuring

1. make a file called `ring.json` in the root directory
2. make it have this structure

```json
{
  "meta": {
    "home": "https://example.com",
    "name": "example webring",
    "summary": "my awesome webring",
    "description": "this is a <b>very awesome webring</b> .",
    "contact": "mailto:me@example.com?subject=so, about that webring"
  },
  "sites": [
    {
      "username": "me",
      "url": "https://myawesome.examplepage"
    }
  ]
}
```

3. (optional) create `.env` with `PORT=3000` or whatever port you want to run it on

## running

ensure you are within the nix shell or otherwise have [bun](https://bun.sh) installed, then run `bun server.ts`.
you may need to specify the port via the `PORT` variable, or you can set it in `.env`

## modifying

css for the main page is in `static/main.css`, css for all embeddables is in `static/style.css`.
you can see how the iframe will look by navigating to `/test`

## adding / removing / editing members

edit `ring.json` to reflect whatever addition / removal / edit you want to make.
the webmaster is the only one who can do this, so only join a ring if you trust the webmaster to
respond to support requests in a timely fashion

## embedding

an example of how to embed the webring is on the home page when running
