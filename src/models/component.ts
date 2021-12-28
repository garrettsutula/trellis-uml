import { DiagramType } from "./diagram";
import { generateComponentMarkup as componentMarkup, generateComponentRelationship as componentRelationship } from "../plantuml/component-diagram";
import { labelToId } from "../common/utils";

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
        switch(type) {
            case DiagramType.Component:
            default:
                return componentMarkup(this);
        }
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
        switch(type) {
            case DiagramType.Component:
            default:
                return componentRelationship(this);
        }
        
    }
}

export enum ComponentType {
    UI = "UI",
    Service = "Service",
    Database = "Database",
}