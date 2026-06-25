import { type Member, members } from "./members.ts";

// biome-ignore format: same as ./members.ts
const authors: Member[] = [
]

if (import.meta.main) {
	const { rm, mkdir, writeFile } = await import("node:fs/promises");

	await rm("./authors", { recursive: true, force: true });
	await mkdir("./authors", { recursive: true });

	for (const member of [...members, ...authors]) {
		await writeFile(`./authors/${member.name}.json`, JSON.stringify(member));
	}
}
