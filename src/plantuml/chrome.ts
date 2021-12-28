export function startUml(fileName: string) {
    return `@startuml ${fileName}\n`;
}

export function endUml() {
    return "@enduml\n";
}

export function titleAndHeader(title: string, header: string) {
    return `header ${header} Diagram\ntitle ${title}\n`;
}

// Add theme
// Add Legend
// Add Color Pallette