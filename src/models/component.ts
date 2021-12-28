import { DiagramType } from "./diagram";
import { getComponentDiagramType } from "../plantuml/component-diagram";
import { labelToId } from "../common/utils";
import { components } from "../app";

export class Component {
    label: string;
    id?: string;
    type: ComponentType;
    stereotype?: string;
    color?: string;
    childComponents?: Array<Component>;
    childRelationships: Array<ComponentRelationship>
    constructor(label: string, type: ComponentType) {
        this.label = label;
        this.id = labelToId(label);
        this.type = type;
    }
    toMarkup(type: DiagramType): string {
        let componentString: string;
        let output: string = '';
        switch(type) {
            case DiagramType.Component:
            default:
                componentString = getComponentDiagramType(this.type);
                break;
        }
        output += `${componentString} "${this.label}" as ${this.id} <<${this.stereotype || this.type}>>`;
        if(this.color) output += " #" + this.color; 
        if (this.childComponents) {
            output += " {\n";
            this.childComponents.forEach((component) => {
                output += component.toMarkup(type) + "\n"
            })
            if (this.childRelationships) {
                this.childRelationships.forEach((relationship) => {
                    output += relationship.toMarkup(type) + "\n";
                });
            }
            output += "\n}\n";
        }
        return output;
    }
}

export interface ComponentRelationship {
    source: Component;
    target: Component;
    toMarkup(type: DiagramType): string;
}

export class Uses implements ComponentRelationship {
    source: Component;
    target: Component;
    constructor(source: Component, target: Component) {
        this.source = source;
        this.target = target;
    }
    toMarkup(type: DiagramType): string {
        return `${this.source.id} -- ${this.target.id}`;
    }
}

export enum ComponentType {
    UI = "UI",
    Service = "Service",
    Database = "Database",
}