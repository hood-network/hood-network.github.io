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
    .syntect({
        comment: {
            scopes: ["comment", "punctuation.comment"],
            color: "red",
            fontStyle: "italic",
        },
        numeric: {
            scopes: ["constant.numeric"],
            color: "red",
        },
        string: {
            scopes: ["string"],
            color: "red",
        },
        builtins: {
            scopes: ["constant.language"],
            color: "red",
        },
        escape: {
            scopes: ["constant.escape"],
            color: "red",
        },
        placeholder: {
            scopes: ["constant.placeholder"],
            color: "red",
        },
        constant: {
            scopes: ["constant.other"],
            color: "red",
        },
        keyword: {
            scopes: ["keyword"],
            exclude: ["operator"],
            color: "red",
        },
    })
    .build();

export default design;
