import type { CollectionEntry } from "astro:content";

export type Member = CollectionEntry<"authors">["data"];

// biome-ignore format: if the functions split to next lines its inconsistent and ugly
export const members: Member[] = [
	member("11pixels", "/static/av/11pixels.256.png", "https://xyzenix.github.io"),

	member("amia", "/static/av/amia.256.png", "https://github.com/aamiaa"),
	member("arhsm", "/static/av/arhsm.256.png", "https://lost.arhsm.cat"),
	member("arilien", "/static/av/arilien.256.png", "https://github.com/configari"),

	member("bignutty", "https://bignutty.gitlab.io/webstorage/bnav/latest-256.png", "https://bignut.zip"),

	member("Chaussette", "/static/av/chaussette.256.png", "https://dfr.gg"),
	member("Chloe", "https://github.com/chloecinders.png", "https://chloecinders.com"),
	member("Cynthia", "/static/av/cynosphere.256.png", "https://c7.pm"),

	member("DarkerInk", "/static/av/darkerink.256.png", "https://github.com/Darker-Ink"),
	member("Dolfies", "https://github.com/dolfies.png", "https://dolfi.es"),
	member("DyDestroyer", "/static/av/dydestroyer.256.png", "https://github.com/DyDestroyer1027"),
	member("Dziurwa", "/static/av/dziurwa.256.png", "https://github.com/Dziurwa14"),

	member("eva", "https://github.com/xyzeva.png", "https://eva.ac"),

	member("Haruka", "/static/av/haruka.256.png", "https://shiroko.me"),

	member("Jay", "https://github.com/jay-taelien.png", "https://github.com/jay-taelien"),

	member("marsh", "https://github.com/marshift.png", "https://marsh.zone"),
	member("Megumin", "/static/av/megumin.256.png", "https://github.com/meguminsama"),

	member("puhbu", "https://github.com/puhboo.png", "https://http.cat/404"),

	member("voc", "/static/av/voc.256.png", "https://voc.pet"),

	member("Yui", "https://github.com/yuifm.png", "https://yui.fm"),

	member("not the neller man", "/static/av/nellerman.256.png", "https://nelly.tools"),
].sort((a, b) => {
	if (a.name === "not the neller man") {
		return 9999;
	}

	return a.name.localeCompare(b.name);
});

export function member(name: string, avatar: string, url: string): Member {
	return { name, avatar, url };
}
