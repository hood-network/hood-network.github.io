import { join } from "node:path";
import { parentPort } from "node:worker_threads";
import type { Design } from "./runtime";

const DESIGN_PATH = join(import.meta.dirname, "design.ts");

const mod = (await import(DESIGN_PATH)) as { default: Design };

parentPort!.postMessage(mod.default.serialize());
parentPort!.close();
