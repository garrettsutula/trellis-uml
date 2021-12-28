import { Component, ComponentRelationship } from "./component";
import { generateComponentDiagram } from '../plantuml/component-diagram';
import { DiagramType } from "./diagram";

export class System {
    name: string;
    components: { [key: string]: Component };
    relationships: { [key: string]: ComponentRelationship };
    constructor(name: string, components: { [key: string]: Component }, relationships: { [key: string]: ComponentRelationship }) {
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