# Personal Portfolio

This project is a simple portfolio website built with **Next.js**. Blog posts are written in Markdown and exported as a static site so it can be deployed to GitHub Pages.

## Scripts

```bash
npm run build   # build Next.js
npm run export  # export static HTML to ./out
npm run deploy  # publish ./out to gh-pages branch
```

## Development

Run `npm run dev` to start a local server at `http://localhost:3000`.

## Deployment

Install dependencies then run:

```bash
npm run build && npm run export
```

The generated site is available in the `out` directory. Use `npm run deploy` to push the contents to the `gh-pages` branch.

### Vercel Deployment

This repository includes a `vercel.json` file that sets the build output directory to `out`. If your Vercel project expects a different directory, update the project settings or adjust this configuration.
