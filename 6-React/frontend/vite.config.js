import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components":path.resolve(__dirname, "./src/components"),
      "@pages":path.resolve(__dirname, "./src/pages"),
      "@styles":path.resolve(__dirname, "./src/styles"),
      "@data":path.resolve(__dirname, "./src/data")
    }
  }
})
