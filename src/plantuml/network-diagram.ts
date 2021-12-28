import { titleAndHeader, startUml, endUml } from "./chrome";
import { Component, ComponentType, ComponentRelationship } from "../models/component"
import { System } from "../models/system";
import { DiagramType } from "../models/diagram";

export function getNetworkDiagramType(type: ComponentType): string {
    switch(type) {
        case ComponentType.UI:
            return "boundary";
        case ComponentType.Service:
            return "component";
        case ComponentType.Database:
            return "database";
        case ComponentType.ExecutionEnvironment:
            return "node";
        default:
            return "component";
    }
}

export function generateNetworkMarkup(component: Component) {
    const type = DiagramType.Network;
    let renderComponent = true;
    if(component.type !== ComponentType.ExecutionEnvironment) renderComponent = false;
    let output = '';
    const componentString = getNetworkDiagramType(component.type);
    if (renderComponent) output += `${componentString} "${component.label}" as ${component.id} <<${component.stereotype || component.type}>>`;
    if(component.color) output += " #" + component.color; 
    if (component.childComponents) {
        if (renderComponent) output += " {\n";
        component.childComponents.forEach((component) => {
            output += component.toMarkup(type) + "\n"
        })
        if (component.childRelationships) {
            component.childRelationships.forEach((relationship) => {
                output += relationship.toMarkup(type) + "\n";
            });
        }
        if (renderComponent) output += "\n}\n";
    }
    return output;
}

export function generateNetworkRelationship(relationship: ComponentRelationship): string {
    if (relationship.source.type === ComponentType.ExecutionEnvironment && 
        relationship.target.type === ComponentType.ExecutionEnvironment) {
            return `${relationship.source.id} -- ${relationship.target.id}\n`;
        }
        return '';
}

export function generateNetworkDiagram(system: System): string {
    let output: string = startUml;
    output += titleAndHeader(system.name, "Component");
    system.components.forEach((component: Component) => {
        output += component.toMarkup(DiagramType.Network);
    })
    system.relationships.forEach((relationship: ComponentRelationship) => {
        output += relationship.toMarkup(DiagramType.Network);
    })
    output += endUml;
    return output;
}