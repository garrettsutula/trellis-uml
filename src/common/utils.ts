export function escapeString(label: string) {
    return label.replace(/ /g, "_");
}