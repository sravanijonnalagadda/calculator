# React Calculator

A simple, modern calculator built with React. Supports basic arithmetic, operator precedence, parentheses, history, and keyboard input. This repository is deployed to GitHub Pages.

## Setup

```bash
npm install
npm start
```

## Testing

```bash
npm test
```

## Deployment

This project uses [`gh-pages`](https://www.npmjs.com/package/gh-pages) to deploy to GitHub Pages.

1. Ensure `homepage` field in `package.json` is set to `https://<username>.github.io/<repo>`.
2. Install dependency:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Run:
   ```bash
   npm run deploy
   ```

## CI (recommended)

You can add a GitHub Actions workflow to run tests on each push. See `.github/workflows/ci.yml`.
