import { defineConfig, loadEnv } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), tailwindcss()],
        base: "/", // Ensures assets are referenced correctly
        server: {
            proxy: {
                "/api": {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        build: {
            outDir: "dist", // Ensures Vercel knows where to find the static output
            emptyOutDir: true, // Cleans old files before build
        },
    };
});
