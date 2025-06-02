import remarkAbbr from "@richardtowers/remark-abbr";
import { defineConfig } from "astro/config";
import Inspect from "vite-plugin-inspect";

import transform from "./src/plugins/mdTranform";
import { remarkMark, remarkSubSup } from "./src/plugins/remark";
import design from "./src/plugins/design/plugin";

export default defineConfig({
    site: "https://hoodnet.work",
    vite: {
        plugins: [Inspect(), design],
    },
    build: {
        format: "file",
    },
    markdown: {
        gfm: true,
        smartypants: true,
        syntaxHighlight: false,
        remarkPlugins: [remarkAbbr, remarkSubSup, remarkMark, transform],
    },
});
