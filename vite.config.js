import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // This tells Vite to use the dist folder for build output
  },
  plugins: [react()],
  base: "/my_chat_bot/", // Make sure this matches your repository name
});
