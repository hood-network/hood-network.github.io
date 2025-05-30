const SYSTEM = "hn";

export function variable(key: string) {
    return `--${SYSTEM}-${key}`;
}

export function token(key: string) {
    return `var(${variable(key.replaceAll(".", "-"))})`;
}
