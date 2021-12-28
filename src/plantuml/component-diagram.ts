import { titleAndHeader, startUml, endUml } from "./chrome";
import { Component, ComponentType } from "../models/component";
import { ComponentRelationship } from "../models/component-relationship";
import { generateComponentMarkup as generateSystemMarkup } from "./system-diagram";
import { System } from "../models/system";
import { escapeString } from "../common/utils";

export function getComponentDiagramType(type: ComponentType): string {
    switch(type) {
        case ComponentType.UI:
            return "boundary";
        case ComponentType.Service:
            return "component";
        case ComponentType.Database:
            return "database";
        case ComponentType.ExecutionEnvironment:
            return "node";
        case ComponentType.API:
            return "interface";
        default:
            return "component";
    }
}

export function generateComponentMarkup(component: Component): string {
    let output = '';
    let renderComponentMarkup = true;
    if (component.type === ComponentType.ExecutionEnvironment) renderComponentMarkup = false;
    const componentString = getComponentDiagramType(component.type);
    if (renderComponentMarkup) {
        output += `${componentString} "${component.label}" as ${escapeString(component.id)}`;
        if(component.stereotype) output += ` <<${component.stereotype}>>`;
        if(component.color) output += " #" + component.color;
    }
    if (component.childComponents.length) {
        if (renderComponentMarkup) output += " {\n";
        component.childComponents.forEach((component) => {
            output += generateComponentMarkup(component) + "\n"
        })
        if (component.childRelationships.length) {
            component.childRelationships.forEach((relationship) => {
                output += generateRelationshipMarkup(relationship);
            });
        }
        if (renderComponentMarkup) output += "}";
    }
    return output;
}

function generateRelationshipMarkup(relationship: ComponentRelationship): string {
    // TODO: Implement config interface
    let output = `${relationship.source.id} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${relationship.target.id}`;
    if (relationship.description) output += `: ${relationship.description}`;
    return output + "\n";
}

function generateComponents(components: Array<Component>) {
    return components
    .filter((component) => {
        const test = component.executionEnvironment === undefined
        return component.executionEnvironment === undefined
    })
    .reduce((output, component, newArry): string => output += generateComponentMarkup(component) + "\n", '');
}

function generateComponentRelationships(relationships: Array<ComponentRelationship>): string {
    const relationshipsAlreadyAdded = [];
    return relationships
    .filter((relationship) => relationship.source.type !== ComponentType.ExecutionEnvironment && 
            relationship.target.type !== ComponentType.ExecutionEnvironment)
    .reduce((output, relationship): string => {
        const newLine = generateRelationshipMarkup(relationship);
        if (!relationshipsAlreadyAdded.includes(newLine)) output += newLine;
        return output;
    }, '');
}

export function generateComponentDiagram(system: System): string {
    let output: string = startUml(`Component Diagram ${system.name}`);
    output += generateSystemMarkup(system) + "{\n"
    output += titleAndHeader(system.name, "Component");
    output += generateComponents(Object.values(system.components));
    output += generateComponentRelationships(Object.values(system.relationships));
    output += "\n}\n";
    output += endUml();
    return output;
}
