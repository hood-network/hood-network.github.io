const SYSTEM = "hn";
const EXTERNAL_SYNTECT = "hn-syntect-";

export type TypescaleRole = "display" | "heading" | "title" | "body" | "label";
export type TypescaleSize = "large" | "medium" | "small";

export type TypescaleBase = {
    [Role in TypescaleRole]?: {
        [Size in TypescaleSize]?: TypescaleValue;
    };
};

export type SystemShape =
    | "none"
    | "extraSmall"
    | "small"
    | "medium"
    | "large"
    | "largeIncreased"
    | "extraLarge"
    | "extraLargeIncreased"
    | "extraExtraLarge"
    | "full";

export type Syntect = Record<string, SyntectStyle>;

export type TokenReference =
    | `ref.typeface.${string}`
    | `ref.palette.${string}`
    | `sys.typescale.${TypescaleRole}.${TypescaleSize}.${keyof TypescaleValue}`
    | `sys.typescale.emphasized.${TypescaleRole}.${TypescaleSize}.${keyof TypescaleValue}`
    | `sys.color.${string}`
    | `sys.shape.${SystemShape}`;

export interface Design {
    tokens: DesignTokens;
    external: {
        syntect: Syntect;
    };
    serialize(): string;
}

export interface DesignTokens {
    typeface: Record<string, string>;
    palette: Record<string, string>;
    typescale: SystemTypescale;
    color: Record<string, ReturnType<typeof themed> | string>;
    shape: Partial<Record<SystemShape, string>>;
}

export interface SyntectStyle {
    scopes: string[];
    exclude?: (string | string[] | undefined)[];
    color: ReturnType<typeof themed> | string;
    fontStyle?: "bold" | "italic";
}

export interface SystemTypescale extends TypescaleBase {
    emphasized?: TypescaleBase;
}

export interface TypescaleValue {
    font: string;
    lineHeight?: number | "normal";
    size?: string;
    weight?: number;
    tracking?: number;
}

export interface RuleCSS {
    selectors: string[];
    properties: Record<string, string | number>;
    children: RuleCSS[];
    addToken(
        reference: TokenReference,
        value: string | number | undefined,
    ): void;
}

export class DesignBuilder {
    private tokens: DesignTokens = {
        typeface: {},
        palette: {},
        typescale: {},
        color: {},
        shape: {},
    };

    private external: Design["external"] = {
        syntect: {},
    };

    typeface(config: Record<string, string>) {
        this.tokens.typeface = { ...this.tokens.typeface, ...config };

        return this;
    }

    palette(config: Record<string, string>) {
        this.tokens.palette = { ...this.tokens.palette, ...config };

        return this;
    }

    typescale(builderFn: (builder: TypescaleBuilder) => SystemTypescale) {
        this.tokens.typescale = builderFn(new TypescaleBuilder());

        return this;
    }

    color(config: Record<string, ReturnType<typeof themed> | string>) {
        this.tokens.color = { ...this.tokens.color, ...config };

        return this;
    }

    shape(config: Partial<Record<SystemShape, string>>) {
        this.tokens.shape = { ...this.tokens.shape, ...config };

        return this;
    }

    syntect(config: Syntect) {
        this.external.syntect = { ...this.external.syntect, ...config };

        return this;
    }

    build(): Design {
        return {
            tokens: this.tokens,
            external: this.external,
            serialize() {
                return new DesignSerializer().serialize(this);
            },
        };
    }
}

class TypescaleBuilderBase<T extends TypescaleBase> {
    // @ts-ignore
    typescale: T = {};

    display(size: TypescaleSize, value: TypescaleValue) {
        this.typescale.display = { ...this.typescale.display, [size]: value };

        return this;
    }

    heading(size: TypescaleSize, value: TypescaleValue) {
        this.typescale.heading = { ...this.typescale.heading, [size]: value };

        return this;
    }

    title(size: TypescaleSize, value: TypescaleValue) {
        this.typescale.title = { ...this.typescale.title, [size]: value };

        return this;
    }

    body(size: TypescaleSize, value: TypescaleValue) {
        this.typescale.body = { ...this.typescale.body, [size]: value };

        return this;
    }

    label(size: TypescaleSize, value: TypescaleValue) {
        this.typescale.label = { ...this.typescale.label, [size]: value };

        return this;
    }

    build() {
        return this.typescale;
    }
}

class TypescaleBuilder extends TypescaleBuilderBase<SystemTypescale> {
    emphasized(
        builderFn: (
            builder: TypescaleBuilderBase<TypescaleBase>,
        ) => TypescaleBase,
    ) {
        this.typescale.emphasized = builderFn(new TypescaleBuilderBase());

        return this;
    }
}

class DesignSerializer {
    serialize({ tokens, external }: Design) {
        const root = this.createRule([":root"], []);
        const light = this.createRule([":root"], []);

        const syntectRules: RuleCSS[] = [];

        for (const [typeface, value] of this.entries(tokens.typeface)) {
            root.addToken(`ref.typeface.${typeface}`, value);
        }

        for (const [color, value] of this.entries(tokens.palette)) {
            root.addToken(`ref.palette.${color}`, value);
        }

        for (const [face, scale] of this.entries(tokens.typescale)) {
            if (face === "emphasized") {
                for (const [realFace, realScale] of this.entries(
                    scale as TypescaleBase,
                )) {
                    this.flattenTypescale(
                        root,
                        realFace,
                        realScale,
                        ".emphasized",
                    );
                }

                continue;
            }

            this.flattenTypescale(
                root,
                face,
                scale as Record<TypescaleSize, TypescaleValue>,
                "",
            );
        }

        for (const [name, color] of this.entries(tokens.color)) {
            this.flattenColor(root, light, name, color);
        }

        for (const [shape, value] of this.entries(tokens.shape)) {
            root.addToken(`sys.shape.${shape}`, value);
        }

        for (const [token, style] of this.entries(external.syntect)) {
            this.flattenColor(
                root,
                light,
                `external.syntect.${token}`,
                style.color,
            );

            const selectors = style.scopes.map((scope, index) => {
                const base = scope
                    .split(".")
                    .map(part => `.${EXTERNAL_SYNTECT}${part}`)
                    .join("");

                const exclude = style.exclude?.[index];
                const not =
                    (typeof exclude === "string" ? [exclude] : exclude)
                        ?.map(
                            scope =>
                                `:not(${scope
                                    .split(".")
                                    .map(part => `.${EXTERNAL_SYNTECT}${part}`)
                                    .join("")})`,
                        )
                        .join("") ?? "";

                return `${base}${not}`;
            });
            const rule = this.createRule(selectors, []);

            rule.properties.color = ref(`sys.color.external.syntect.${token}`);

            if (style.fontStyle != null) {
                rule.properties["font-style"] = style.fontStyle;
            }

            syntectRules.push(rule);
        }

        const media = this.createRule(
            ["@media (prefers-color-scheme: light)"],
            [light],
        );

        return this.toCSS([root, media].concat(syntectRules));
    }

    entries<K extends keyof any, V>(obj: { [H in K]?: V }) {
        return Object.entries(obj) as [K, V][];
    }

    createRule(
        selectors: RuleCSS["selectors"],
        children: RuleCSS["children"],
    ): RuleCSS {
        return {
            selectors,
            properties: {},
            children,
            addToken(reference, value) {
                if (value == null) return;

                this.properties[token(reference)] = value;
            },
        } satisfies RuleCSS;
    }

    flattenTypescale(
        root: RuleCSS,
        face: keyof TypescaleBase,
        scale: { [K in TypescaleSize]?: TypescaleValue },
        prefix: "" | ".emphasized",
    ) {
        for (const [size, data] of this.entries(scale)) {
            root.addToken(
                `sys.typescale${prefix}.${face}.${size}.font`,
                data.font,
            );

            root.addToken(
                `sys.typescale${prefix}.${face}.${size}.size`,
                data.size,
            );

            root.addToken(
                `sys.typescale${prefix}.${face}.${size}.lineHeight`,
                data.lineHeight,
            );

            root.addToken(
                `sys.typescale${prefix}.${face}.${size}.weight`,
                data.weight,
            );

            root.addToken(
                `sys.typescale${prefix}.${face}.${size}.tracking`,
                data.tracking,
            );
        }
    }

    flattenColor(
        root: RuleCSS,
        light: RuleCSS,
        name: string,
        color: ReturnType<typeof themed> | string,
    ) {
        if (typeof color === "string") {
            root.addToken(`sys.color.${name}`, color);

            return;
        }

        root.addToken(`sys.color.${name}`, color.dark);
        light.addToken(`sys.color.${name}`, color.light);
    }

    toCSS(rules: RuleCSS[], depth = 0) {
        const indent = " ".repeat(depth * 4);

        let out = "";

        for (const rule of rules) {
            out += "\n";
            out += indent;
            out += rule.selectors.join(`,\n${indent}`);
            out += " {";

            const innerIndent = " ".repeat((depth + 1) * 4);

            for (const [property, value] of this.entries(rule.properties)) {
                out += "\n";
                out += innerIndent;
                out += property;
                out += ": ";
                out += value;
                out += ";";
            }

            out += this.toCSS(rule.children, depth + 1);

            out += "\n";
            out += indent;
            out += "}\n";
        }

        return out;
    }
}

export function themed(light: string, dark: string) {
    return { light, dark };
}

export function token(reference: TokenReference) {
    const variable = reference.replaceAll(/\.|[A-Z]/g, match =>
        match === "." ? "-" : `-${match.toLowerCase()}`,
    );

    return `--${SYSTEM}-${variable}`;
}

export function ref(reference: TokenReference) {
    return `var(${token(reference)})`;
}
