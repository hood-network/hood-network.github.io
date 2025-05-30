import { type Theme, generateCSS as generateThemeCSS } from "./syntect";
import { type DesignTokens, generateCSS as generateTokenCSS } from "./tokens";
import { token as t } from "./utils";

const TOKENS: DesignTokens = {
    ref: {
        typeface: {
            brand: '"Dela Gothic One", sans-serif',
            heading: '"Figtree", sans-serif',
            plain: '"Roboto", sans-serif',
        },
        palette: {
            brand: "#ff6868",
        },
    },
    sys: {
        typescale: {
            "display-medium": {
                font: t("ref.font.brand"),
            },
        },
        color: {
            surface: "linear-gradient(0deg, #181b1e, #23272b)",
            "on-surface": "#ffffff",

            "surface-variant": "#303236",
            "surface-variant-outline": "#5a5c60",

            container: "#3c3f44",
            "container-outline": "linear-gradient(135deg, #5a5c60, #3c4044)",
            "container-outline-variant": "#545659",
        },
    },
};

const THEME: Theme = {
    prefix: "hn-syntect-",
    tokens: {
        comment: {
            scopes: ["comment", "punctuation.definition.comment"],
            fontStyle: "italic",
        },
        numeric: {
            scopes: ["constant.numeric"],
        },
        builtins: {
            scopes: ["constant.language"],
        },
    },
};

console.log(generateTokenCSS(TOKENS));
console.log(generateThemeCSS(THEME));
