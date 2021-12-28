import { Component, ComponentRelationship } from "./component";
import { generateComponentDiagram } from '../plantuml/component-diagram';
import { DiagramType } from "./diagram";

export class System {
    name: string;
    components: Array<Component>;
    relationships: Array<ComponentRelationship>;
    constructor(name: string, components: Array<Component>, relationships: Array<ComponentRelationship>) {
        this.name = name;
        this.components = components;
        this.relationships = relationships;
    }
    toMarkup(type: DiagramType): string {
        switch(type) {
            default:
                return generateComponentDiagram(this);
        }
    }
}