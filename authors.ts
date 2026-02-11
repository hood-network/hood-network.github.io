import type { CollectionEntry } from "astro:content";

type Member = CollectionEntry<"authors">["data"];

export const members: Member[] = [
    {
        name: "Megumin",
        avatar: "/static/av/megumin.256.png",
        url: "https://github.com/meguminsama",
    },
    {
        name: "Cynthia",
        avatar: "/static/av/cynosphere.256.png",
        url: "https://c7.pm",
    },
    {
        name: "arilien",
        avatar: "/static/av/arilien.256.png",
        url: "https://github.com/configari",
    },
    {
        name: "amia",
        avatar: "/static/av/amia.256.png",
        url: "https://github.com/aamiaa",
    },
    {
        name: "arHSM",
        avatar: "/static/av/arhsm.256.png",
        url: "https://lost.arhsm.cat",
    },
    {
        name: "bignutty",
        avatar: "https://bignutty.gitlab.io/webstorage/bnav/latest-256.png",
        url: "https://bignut.zip",
    },
    {
        name: "Dolfies",
        avatar: "https://github.com/dolfies.png",
        url: "https://dolfi.es",
    },
    {
        name: "DyDestroyer",
        avatar: "/static/av/dydestroyer.256.png",
        url: "https://github.com/DyDestroyer1027",
    },
    {
        name: "Dziurwa",
        avatar: "/static/av/dziurwa.256.png",
        url: "https://github.com/Dziurwa14",
    },
    {
        name: "Haruka",
        avatar: "/static/av/haruka.256.png",
        url: "https://shiroko.me",
    },
    {
        name: "marsh",
        avatar: "https://github.com/marshift.png",
        url: "https://marsh.zone",
    },
    {
        name: "puhbu",
        avatar: "https://github.com/puhboo.png",
        url: "https://http.cat/404",
    },
    {
        name: "Vocane",
        avatar: ".",
        url: "https://voc.pet",
    },
    {
        name: "11pixels",
        avatar: "/static/av/11pixels.256.png",
        url: "https://xyzenix.github.io",
    },
    {
        name: "eva",
        avatar: "https://github.com/xyzeva.png",
        url: "https://kibty.town",
    },
    {
        name: "Yui",
        avatar: "https://github.com/yuifm.png",
        url: "https://yui.fm",
    },
    {
        name: "Jay",
        avatar: "https://avatars.githubusercontent.com/u/79278716?v=4",
        url: "https://github.com/jay-taelien",
    },
    {
        name: "Chaussette",
        avatar: "/static/av/chaussette.256.png",
        url: "https://dfr.gg",
    },
    {
        name: "Chloe",
        avatar: "https://github.com/chloecinders.png",
        url: "https://chloecinders.com",
    },
    {
        name: "not the neller man",
        avatar: "/static/av/nellerman.256.png",
        url: "https://nelly.tools",
    },
];

// TODO: use this when it releases
// if (import.meta.main) {
if (process.argv[1] === import.meta.filename) {
    const { rm, mkdir, writeFile } = await import("node:fs/promises");

    await rm("./authors", { recursive: true, force: true });
    await mkdir("./authors", { recursive: true });

    for (const member of members) {
        await writeFile(
            `./authors/${member.name}.json`,
            JSON.stringify(member),
        );
    }
}
