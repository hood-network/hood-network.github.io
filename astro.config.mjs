import { defineConfig } from "astro/config";
import transform from "./src/plugins/mdTranform";

export default defineConfig({
    site: "https://hoodnet.work",
    build: {
        format: "file",
    },
    markdown: {
        gfm: true,
        smartypants: true,
        syntaxHighlight: false,
        remarkPlugins: [transform],
    },
});
