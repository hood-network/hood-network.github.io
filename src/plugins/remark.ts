import type { Data, Literal, PhrasingContent } from "mdast";
import type { Processor } from "unified";

declare module "mdast" {
    interface PhrasingContentMap {
        subscript: Subscript;
        superscript: Superscript;
        mark: Mark;
    }

    interface RootContentMap {
        subscript: Subscript;
        superscript: Superscript;
        mark: Mark;
    }
}

export interface SubscriptData extends Data {
    hName: "sub";
}

export interface Subscript extends Literal {
    type: "subscript";
    children: PhrasingContent[];
}

export interface SuperscriptData extends Data {
    hName: "sup";
}

export interface Superscript extends Literal {
    type: "superscript";
    children: PhrasingContent[];
}

export interface MarkData extends Data {
    hName: "mark";
}

export interface Mark extends Literal {
    type: "mark";
    children: PhrasingContent[];
}

export function remarkSubSup(this: Processor) {
    const subscriptConstruct = {
        name: "subscript",
        tokenize: subsupTokenize("subscript", 126),
    };
    const superscriptConstruct = {
        name: "superscript",
        tokenize: subsupTokenize("superscript", 94),
    };

    const scripts = {
        text: { 126: subscriptConstruct, 94: superscriptConstruct },
    };

    function subsupTokenize(type: string, delimiter: number) {
        return (effects: any, ok: any, nok: (code: number) => any) => {
            function start(code: number) {
                effects.enter(`${type}`);
                effects.enter(`${type}Marker`);
                effects.consume(code);
                effects.exit(`${type}Marker`);
                effects.enter(`${type}Text`);
                effects.enter("chunkText", { contentType: "text" });

                return begin;
            }

            function begin(code: number) {
                return code === delimiter ? nok(code) : inside(code);
            }

            function inside(code: number) {
                if (
                    code === -5 ||
                    code === -4 ||
                    code === -3 ||
                    code === null
                ) {
                    return nok(code);
                }

                if (code === 92) {
                    effects.consume(code);
                    return insideEscape;
                }

                if (code === delimiter) {
                    effects.exit("chunkText");
                    effects.exit(`${type}Text`);
                    effects.enter(`${type}Marker`);
                    effects.consume(code);
                    effects.exit(`${type}Marker`);
                    effects.exit(`${type}`);

                    return ok;
                }

                effects.consume(code);
                return inside;
            }

            function insideEscape(code: number) {
                if (code === 92 || code === delimiter) {
                    effects.consume(code);
                    return inside;
                }

                return inside(code);
            }

            return start;
        };
    }

    function enterFunc(type: string) {
        return function (this: any, token: any) {
            this.enter(
                { type, children: [], data: { hName: type.slice(0, 3) } },
                token,
            );
        };
    }

    function exitFunc(this: any, token: any) {
        this.exit(token);
    }

    const mdastVariables = {
        enter: {
            subscriptText: enterFunc("subscript"),
            superscriptText: enterFunc("superscript"),
        },
        exit: {
            subscriptText: exitFunc,
            superscriptText: exitFunc,
        },
    };

    const data = this.data() as any;

    data.micromarkExtensions ??= [];
    data.fromMarkdownExtensions ??= [];

    data.micromarkExtensions.push(scripts);
    data.fromMarkdownExtensions.push(mdastVariables);
}

export function remarkMark(this: Processor) {
    const markConstruct = { name: "mark", tokenize: markTokenize };
    const mark = {
        text: { 61: markConstruct },
    };

    function markTokenize(effects: any, ok: any, nok: (code: number) => any) {
        function start(code: number) {
            effects.enter("mark");
            effects.enter("markMarker");
            effects.consume(code);

            return opening;
        }

        function opening(code: number) {
            if (code !== 61) return nok(code);

            effects.consume(code);
            effects.exit("markMarker");
            effects.enter("markText");
            effects.enter("chunkText", { contentType: "text" });

            return begin;
        }

        function begin(code: number) {
            return code === 61 ? nok(code) : inside(code);
        }

        function inside(code: number) {
            if (code === -5 || code === -4 || code === -3 || code === null) {
                return nok(code);
            }

            if (code === 92) {
                effects.consume(code);
                return insideEscape;
            }

            if (code === 61) {
                effects.exit("chunkText");
                effects.exit("markText");
                effects.enter("markMarker");
                effects.consume(code);

                return closing;
            }

            effects.consume(code);
            return inside;
        }

        function closing(code: number) {
            if (code !== 61) return nok(code);

            effects.consume(code);
            effects.exit("markMarker");
            effects.exit("mark");

            return ok;
        }

        function insideEscape(code: number) {
            if (code === 92 || code === 61) {
                effects.consume(code);
                return inside;
            }

            return inside(code);
        }

        return start;
    }

    function enterFunc(this: any, token: any) {
        this.enter(
            { type: "mark", children: [], data: { hName: "mark" } },
            token,
        );
    }

    function exitFunc(this: any, token: any) {
        this.exit(token);
    }

    const mdastVariables = {
        enter: {
            markText: enterFunc,
        },
        exit: {
            markText: exitFunc,
        },
    };

    const data = this.data() as any;

    data.micromarkExtensions ??= [];
    data.fromMarkdownExtensions ??= [];

    data.micromarkExtensions.push(mark);
    data.fromMarkdownExtensions.push(mdastVariables);
}
