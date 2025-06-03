import { join } from "node:path";

import type { Plugin } from "vite";

import { Worker } from "node:worker_threads";

const DESIGN_PATH = join(import.meta.dirname, "design.ts");

const VIRTUAL_MODULE_ID = "hn:design.css";
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

declare module "hn:design.css" {}

export default {
    name: VIRTUAL_MODULE_ID,
    enforce: "pre",
    resolveId(id) {
        if (!id.startsWith(VIRTUAL_MODULE_ID)) return;

        return RESOLVED_VIRTUAL_MODULE_ID;
    },
    async load(id) {
        if (!id.startsWith(RESOLVED_VIRTUAL_MODULE_ID)) return;

        const worker = new Worker(join(import.meta.dirname, "./worker.ts"));

        let resolve: (v: string) => void;
        const promise = new Promise<string>(res => {
            resolve = res;
        });

        worker.on("message", ev => {
            resolve(ev);
        });

        return await promise;
    },
    handleHotUpdate(ctx) {
        if (ctx.file !== DESIGN_PATH) return;

        const mod = ctx.server.moduleGraph.getModuleById(
            RESOLVED_VIRTUAL_MODULE_ID,
        )!;

        ctx.server.moduleGraph.invalidateModule(mod);

        return [mod];
    },
} satisfies Plugin;
