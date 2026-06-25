import { unified } from "@astrojs/markdown-remark";
import remarkAbbr from "@richardtowers/remark-abbr";
import { defineConfig } from "astro/config";

import design from "./src/plugins/design/plugin";
import transform from "./src/plugins/mdTranform";
import { remarkMark, remarkSubSup } from "./src/plugins/remark";

export default defineConfig({
	site: "https://hoodnet.work",
	vite: {
		plugins: [design],
	},
	build: {
		format: "file",
	},
	markdown: {
		syntaxHighlight: false,
		processor: unified({
			features: {
				gfm: true,
				smartPunctuation: true,
				subscript: true,
				superscript: true,
			},
			remarkPlugins: [remarkAbbr, remarkSubSup, remarkMark, transform],
		}),
	},
});
