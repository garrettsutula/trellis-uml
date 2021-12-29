export function escapeString(label: string) {
    return label.replace(/[\/ ]/g, "_").replace(/[\(\)]/g, "")
}