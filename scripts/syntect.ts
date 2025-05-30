import { token } from "./utils";

export interface Theme {
    prefix: string;
    tokens: Record<
        string,
        {
            scopes: string[];
            fontStyle?: "bold" | "italic";
        }
    >;
}

export function generateCSS({ prefix, tokens }: Theme) {
    let css = "";

    for (const [name, { scopes, fontStyle }] of Object.entries(tokens)) {
        const selector = scopes
            .map(scope =>
                scope
                    .split(".")
                    .map(level => `.${prefix}${level}`)
                    .join(""),
            )
            .join(",");

        const fg = makeProperty("color", token(`sys.color.syntect.${name}`));
        const fs = makeProperty("font-style", fontStyle);

        css += `${selector}{${fg}${fs}}`;
    }

    return css;
}

function makeProperty(property: string, value: string | undefined) {
    if (value == null) return "";

    return `${property}: ${value};`;
}
