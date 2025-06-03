import { DesignBuilder, ref, themed } from "./runtime.ts";

const design = new DesignBuilder()
    .typeface({
        brand: '"Dela Gothic One", sans-serif',
        heading: '"Figtree", sans-serif',
        plain: '"Roboto", sans-serif',
        monospace: '"Jetbrains Mono", monospace',
    })
    .palette({
        brand: "#ff6868",
    })
    .typescale(builder =>
        builder
            .display("medium", {
                font: ref("ref.typeface.brand"),
                lineHeight: "normal",
                size: "2em",
                weight: 400,
            })
            .heading("large", {
                font: ref("ref.typeface.heading"),
                lineHeight: "normal",
                size: "2em",
                weight: 700,
            })
            .heading("medium", {
                font: ref("ref.typeface.heading"),
                lineHeight: "normal",
                weight: 600,
            })
            .body("medium", {
                font: ref("ref.typeface.plain"),
                lineHeight: "normal",
                size: "1em",
            })
            .build(),
    )
    .color({
        background: themed(
            "linear-gradient(0deg, #ffffff, #f9fafb)",
            "linear-gradient(0deg, #181b1e, #23272b)",
        ),
        onBackground: themed("#404040", "#ffffff"),

        tertiary: themed("#ff686855", "#ff6868aa"),
        onTertiary: themed("#404040", "#ffffff"),

        surface: themed("#f1f2f3", "#303236"),
        surfaceOutline: themed("#23272b", "#5a5c60"),
        onSurface: themed("#404040", "#ffffff"),

        surfaceContainer: themed("#f1f2f3", "#3c3f44"),
        onSurfaceContainer: themed("#404040", "#ffffff"),

        outline: themed(
            "linear-gradient(135deg, #d6d8db, #e4e5e7)",
            "linear-gradient(135deg, #5a5c60, #3c4044)",
        ),
        outlineVariant: themed("#c9cbcf", "#545659"),
    })
    .shape({
        none: "0",
        extraSmall: "4px",
        small: "8px",
        medium: "12px",
        large: "16px",
        largeIncreased: "20px",
        extraLarge: "28px",
        extraLargeIncreased: "32px",
        extraExtraLarge: "48px",
        full: "9999px",
    })
    .syntect(
        // this is adopted from the rose-pine theme for typst
        //
        // credits to original authors:
        // https://github.com/rose-pine/typst/tree/main
        //
        // commit hash: 1ea2d2eb1c3ae0c136e23888cc4c224a6de8224f
        {
            comment: {
                scopes: ["comment"],
                color: themed("#797593", "#908caa"),
                fontStyle: "italic",
            },
            string: {
                scopes: ["string", "variable.parameter"],
                color: themed("#ea9d34", "#f6c177"),
            },
            numeric: {
                scopes: [
                    "constant.numeric",
                    "constant.language",
                    "constant.character",
                    "constant.other",
                ],
                color: themed("#907aa9", "#c4a7e7"),
            },
            variable: {
                scopes: ["variable"],
                color: themed("#d7827e", "#ea9a97"),
            },
            keyword: {
                scopes: ["keyword", "storage", "entity.name.tag"],
                color: themed("#b4637a", "#eb6f92"),
            },
            type: {
                scopes: [
                    "storage.type",
                    "support.function",
                    "support.constant",
                    "support.type",
                    "support.class",
                ],
                color: themed("#56949f", "#9ccfd8"),
            },
            class: {
                scopes: [
                    "entity.name.class",
                    "entity.other.inherited-class",
                    "entity.name.function",
                    "entity.other.attribute-name",
                ],
                color: themed("#286983", "#3e8fb0"),
            },
        },
    )
    .build();

export default design;
