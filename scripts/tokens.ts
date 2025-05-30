import { variable } from "./utils";

export type TypescaleRoles = "display" | "heading" | "title" | "body" | "label";
export type TypescaleSizes = "large" | "medium" | "small";

export type TypescaleBase = {
    [K in `${TypescaleRoles}-${TypescaleSizes}`]?: {
        font: string;
        lineHeight?: string;
        size?: string;
        weight?: number;
        tracking?: number;
    };
};

export interface Typescale extends TypescaleBase {
    emphasized?: TypescaleBase;
}

export interface DesignTokens {
    ref?: {
        typeface?: Record<string, string>;
        palette?: Record<string, Record<number, string> | string>;
    };
    sys?: {
        typescale?: Typescale;
        color?: Record<string, Record<string, string> | string>;
    };
}

export function generateCSS(tokens: DesignTokens) {
    const variables = flattenRecord(tokens, undefined);

    return `${Object.entries(variables)
        .map(([prop, value]) => `${variable(prop)}: ${value};`)
        .join("\n")}`;
}

function flattenRecord(obj: Record<string, any>, stack: string | undefined) {
    const variables: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj)) {
        const prop = stack != null ? `${stack}.${key}` : key;

        if (typeof value === "object") {
            Object.assign(variables, flattenRecord(value, prop));

            continue;
        }

        variables[prop] = value.toString();
    }

    return variables;
}
