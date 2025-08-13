# Chicken Road Game Hub

This is a React application built with Vite for the Chicken Road Game Hub.

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages. Follow these steps to deploy:

1. Make sure you have the latest changes committed to your repository

2. Run the deployment command:
   ```
   npm run deploy
   ```

3. The site will be built and deployed to the `gh-pages` branch of your repository

4. Your site will be available at: https://hunter-earning.github.io/tool

## Troubleshooting GitHub Pages Deployment

If you encounter a blank page or 404 errors after deployment:

1. Ensure the `base` in `vite.config.ts` is set to `/tool/`
2. Make sure the `homepage` in `package.json` is set to `https://hunter-earning.github.io/tool`
3. Check that asset paths in `index.html` use relative paths (starting with `./`) instead of absolute paths
4. Verify that a `.nojekyll` file exists in the public folder
5. After making changes, rebuild and redeploy with `npm run deploy`

## Development

To run the development server:

```
npm run dev
```

## Build

To build the project for production:

```
npm run build
```

## Preview

To preview the production build locally:

```
npm run preview
```