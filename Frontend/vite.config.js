import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // Add React plugin if not already included
    // Add other plugins as needed
  ],
  resolve: {
    // Ensure .js and .jsx files are resolved
    extensions: ['.mjs', '.js', '.jsx', '.json'],
  },
  build: {
    // Specify the entry file
    build: {
      rollupOptions: {
        input: 'index.html',
      },
    },
  },
  // server: {
  //   proxy: {
  //     // Proxy API requests that start with /api
  //     '/api': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //       // No rewrite needed, /api remains /api
  //     },
  //     // Proxy other paths (adjust this according to your needs)
  //     '/other': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/other/, ''), // Adjust the path as needed
  //     },
  //     // Add more proxies as needed for other paths
  //   },
  // },
});
