import { titleAndHeader, startUml, endUml } from "./chrome";
import { Component, ComponentType, ComponentRelationship } from "../models/component"
import { System } from "../models/system";
import { DiagramType } from "../models/diagram";

export function getComponentDiagramType(type: ComponentType): string {
    switch(type) {
        case ComponentType.UI:
            return "boundary";
        case ComponentType.Service:
            return "component";
        case ComponentType.Database:
            return "database";
        default:
            return "component";
    }
}

export function generateComponentMarkup(component: Component) {
    const type = DiagramType.Component;
    let output = '';
    const componentString = getComponentDiagramType(component.type);
        output += `${componentString} "${component.label}" as ${component.id} <<${component.stereotype || component.type}>>`;
        if(component.color) output += " #" + component.color; 
        if (component.childComponents) {
            output += " {\n";
            component.childComponents.forEach((component) => {
                output += component.toMarkup(type) + "\n"
            })
            if (component.childRelationships) {
                component.childRelationships.forEach((relationship) => {
                    output += relationship.toMarkup(type) + "\n";
                });
            }
            output += "\n}\n";
        }
        return output;
}

export function generateComponentRelationship(relationship: ComponentRelationship): string {
    return `${relationship.source.id} -- ${relationship.target.id}`;
}

export function generateComponentDiagram(system: System): string {
    let output: string = startUml;
    output += titleAndHeader(system.name, "Component");
    system.components.forEach((component: Component) => {
        output += component.toMarkup(DiagramType.Component) + '\n';
    })
    system.relationships.forEach((relationship: ComponentRelationship) => {
        output += relationship.toMarkup(DiagramType.Component) + '\n';
    })
    output += endUml;
    return output;
}