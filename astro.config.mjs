import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://hoodnet.work",
    vite: {
        server: {
            allowedHosts: ["lost.arhsm.cat"]
        }
    }
});
