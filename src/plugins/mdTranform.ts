import GithubSlugger from "github-slugger";
import type { Parent, Root, RootContent } from "mdast";
import { toString as raw } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

const slugger = new GithubSlugger();

export default function transform() {
    return mutate;
}

function mutate(tree: Root) {
    visit(tree, (node, index, parent) => {
        switch (node.type) {
            case "inlineCode":
                node.data = node.data || {};
                node.data.hProperties = node.data.hProperties || {};
                node.data.hProperties["data-code"] = "inline";

                return;
            case "heading":
                return wrapNode(
                    node,
                    {
                        start: `<a href=${JSON.stringify(`#${slugger.slug(raw(node))}`)} data-wraps="heading">`,
                        end: "</a>",
                    },
                    parent,
                    index,
                );
            case "table":
                return wrapNode(
                    node,
                    { start: '<div data-wraps="table">', end: "</div>" },
                    parent,
                    index,
                );
        }
    });
}

function isNonNullish<T>(item: T): item is Exclude<T, null | undefined> {
    return item != null;
}

function wrapNode<T extends RootContent>(
    node: T,
    html: { start: string; end: string },
    parent: Parent | undefined,
    index: number | undefined,
) {
    if (isNonNullish(parent) && isNonNullish(index)) {
        parent.children = [
            ...parent.children.slice(0, index),
            {
                type: "html",
                value: html.start,
            },
            node,
            { type: "html", value: html.end },
            ...parent.children.slice(index + 1),
        ];

        return index + 2;
    }

    console.warn(`\`${node.type}\` found without any parent and/or index!`);
}
