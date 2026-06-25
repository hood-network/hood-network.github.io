import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parentPort } from "node:worker_threads";

import type { Design } from "./runtime";

const DESIGN_PATH = pathToFileURL(
	join(import.meta.dirname, "design.ts"),
).toString();

const mod = (await import(DESIGN_PATH)) as { default: Design };

parentPort!.postMessage(mod.default.serialize());
parentPort!.close();
