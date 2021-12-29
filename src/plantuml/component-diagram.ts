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
        case ComponentType.Queue:
            return "queue";
        case ComponentType.Processor:
                return "control";
        default:
            return "component";
    }
}

export function generateComponentMarkup(component: Component, tabIndex: number = 1): string {
    let output = '';
    let renderComponentMarkup = true;
    const componentString = getComponentDiagramType(component.type);
    output += `${'\t'.repeat(tabIndex)}`;
    output += `${componentString} "${component.label}" as ${escapeString(component.id)}`;
    if(component.stereotype) output += ` <<${component.stereotype}>>`;
    if(component.color) output += " #" + component.color;

    if (component.childComponents.length) {
        output += " {\n";
        component.childComponents.forEach((component) => {
            output += generateComponentMarkup(component, tabIndex + 1) + "\n"
        })
        if (component.childRelationships.length) {
            component.childRelationships.forEach((relationship) => {
                output += generateRelationshipMarkup(relationship, tabIndex + 1);
            });
        }
        output += "}";
    }
    return output;
}

function generateRelationshipMarkup(relationship: ComponentRelationship, tabIndex: number = 1): string {
    // TODO: Implement config interface
    let output = `${'\t'.repeat(tabIndex)}`;
    output += `${relationship.source.id} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${relationship.target.id}`;
    if (relationship.description) output += `: ${relationship.description}`;
    return output + "\n";
}

function generateComponents(components: Array<Component>) {
    return components
    .filter ((component) => component.type !== ComponentType.ExecutionEnvironment)
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
    const componentsToRender = new Map();

    Object.values(system.components).forEach((component) => {
        if(componentsToRender.has(component.id) === false) componentsToRender.set(component.id, component);
    })

    Object.values(system.relationships).forEach(({source, target}) => {
        if(componentsToRender.has(source.id) === false) componentsToRender.set(source.id, source);
        if(componentsToRender.has(target.id) === false) componentsToRender.set(target.id, target);
    })

    let output: string = startUml(`Component Diagram ${system.name}`);
    output += titleAndHeader(system.name, "Component");
    output += generateSystemMarkup(system) + "{\n"
    output += generateComponents(Array.from(componentsToRender.values()));
    output += generateComponentRelationships(Object.values(system.relationships));
    output += "}\n";
    output += endUml();
    return output;
}
