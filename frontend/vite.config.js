import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    port:2000,
    proxy: {
      '/api': {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
