import { highlight } from "@syntect/node";
import GithubSlugger from "github-slugger";
import type { Code, InlineCode, Parent, Root, RootContent } from "mdast";
import { toString as raw } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

const slugger = new GithubSlugger();

export default function transform() {
    return mutate;
}

function mutate(tree: Root) {
    visit(tree, (node, index, parent) => {
        switch (node.type) {
            case "code":
                extendDataset(node, { "data-hn-code-type": "block" });
                tryHighlight(node, node.lang);

                return;
            case "heading":
                return wrapNode(
                    node,
                    {
                        start: `<a href=${JSON.stringify(`#${slugger.slug(raw(node))}`)} data-hn-wraps="heading">`,
                        end: "</a>",
                    },
                    parent,
                    index,
                );
            case "inlineCode": {
                extendDataset(node, { "data-hn-code-type": "inline" });

                const maybeLang = node.value.trimEnd().indexOf(" ");

                if (maybeLang === -1 || maybeLang > 10) return;

                const lang = node.value.slice(0, maybeLang);

                tryHighlight(node, lang, maybeLang + 1);

                return;
            }
            case "table":
                return wrapNode(
                    node,
                    { start: '<div data-hn-wraps="table">', end: "</div>" },
                    parent,
                    index,
                );
        }
    });
}

function wrapNode<T extends RootContent>(
    node: T,
    html: { start: string; end: string },
    parent: Parent | undefined,
    index: number | undefined,
) {
    if (parent == null || index == null) {
        console.warn(`\`${node.type}\` found without any parent and/or index!`);
        return;
    }

    parent.children.splice(index, 0, { type: "html", value: html.start });
    parent.children.splice(index + 2, 0, { type: "html", value: html.end });

    return index + 2;
}

function extendDataset<T extends RootContent>(
    node: T,
    dataset: Record<string, string>,
) {
    node.data ??= {};
    node.data.hProperties ??= {};

    return Object.assign(node.data.hProperties, dataset);
}

function tryHighlight(
    node: Code | InlineCode,
    lang: string | null | undefined,
    offset?: number,
) {
    if (lang == null) return;

    const { html, language } = highlight(
        offset != null ? node.value.slice(offset) : node.value,
        lang,
        "hn-syntect-",
    );

    extendDataset(node, { "data-hn-code-language": language });

    if (language === "Plain Text") return;

    node.data ??= {};
    node.data.hChildren ??= [];
    node.data.hChildren.push({ type: "raw", value: html });
}
