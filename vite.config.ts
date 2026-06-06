import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load variables from .env into process.env so our custom API handler can read them
config();

// A custom Vite plugin to serve the Vercel serverless functions locally
const apiMiddleware = () => ({
  name: 'api-middleware',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url?.startsWith('/api/')) {
        const route = req.url.replace('/api/', '').split('?')[0];
        try {
          const handlerPath = path.resolve(__dirname, `./api/${route}.js`);
          
          if (!fs.existsSync(handlerPath)) {
            return next();
          }

          // Use a timestamp to bypass module caching during development
          const handler = await import(`file://${handlerPath}?update=${Date.now()}`);
          
          // Polyfill Vercel response helpers for the local Node server
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          await handler.default(req, res);
        } catch (e) {
          console.error(`API Route Error (${route}):`, e);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiMiddleware()],
});
