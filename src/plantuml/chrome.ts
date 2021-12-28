export const startUml = "@startuml\n";
export const endUml = "@enduml\n";

export function titleAndHeader(title: string, header: string) {
    return `header ${header} Diagram\ntitle ${title}\n`;
}