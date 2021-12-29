import { titleAndHeader, startUml, endUml } from "./chrome";
import { Component, ComponentType} from "../models/component"
import { ComponentRelationship } from "../models/component-relationship"
import { System } from "../models/system";

export function getNetworkDiagramType(type: ComponentType): string {
    switch(type) {
        case ComponentType.ExecutionEnvironment:
            return "node";
        default:
            return "component";
    }
}

export function generateComponentMarkup(component: Component, componentsToRender: Map<string, Component>, tabIndex: number = 1) {
    let output = '';
    let renderComponentMarkup = true;
    if (component.type !== ComponentType.ExecutionEnvironment) renderComponentMarkup = false;
    const componentString = getNetworkDiagramType(component.type);
    if (renderComponentMarkup) {
        output += `${'\t'.repeat(tabIndex)}`;
        output += `${componentString} "${component.label}" as ${component.id} <<${component.stereotype || component.type}>>`;
        if(component.color) output += " #" + component.color; 
    }
    if (component.childComponents.length) {
        if (renderComponentMarkup) output += " {\n";
        component.childComponents.forEach((component) => {
            if (componentsToRender.has(component.id)) {
                const markup = generateComponentMarkup(component, componentsToRender, tabIndex + 1);
                if (markup.length) output += markup
                if (output.slice(-1) !== "\n") output += '\n';
            }
        })
        if (component.childRelationships.length) {
            component.childRelationships.forEach((relationship) => {
                output += generateRelationshipMarkup(relationship, tabIndex + 1);
            });
        }
        if (renderComponentMarkup) output += `${'\t'.repeat(tabIndex)}}\n`;
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

function generateComponents(components: Array<Component>, componentsToRender: Map<string, Component>) {
    return components
    .reduce((output, component): string => output += generateComponentMarkup(component, componentsToRender), '');
}

function generateRelationships(relationships: Array<ComponentRelationship>): string {
    const relationshipsAlreadyAdded = [];
    return relationships
        .filter((relationship) => relationship.source.type === ComponentType.ExecutionEnvironment && 
                relationship.target.type === ComponentType.ExecutionEnvironment)
        .reduce((output, relationship): string => {
            const newLine = generateRelationshipMarkup(relationship);
            if (!relationshipsAlreadyAdded.includes(newLine)) output += newLine;
            return output;
        }, '');
}

function recurseParentComponents(component: Component, componentsToRender) {
    if (componentsToRender.has(component.id) === false) componentsToRender.set(component.id, component);
    if (component.parentComponent) {
        return recurseParentComponents(component.parentComponent, componentsToRender);
    }
    return component;
}


export function generateNetworkDiagram(system: System): string {
    let output: string = startUml(`Network Diagram ${system.name}`);
    output += titleAndHeader(system.name, "Network");

    const topLevelComponents = new Map<string, Component>();
    const componentsToRender = new Map();

    Object.values(system.components).forEach((component) => {
        const topComponent = recurseParentComponents(component, componentsToRender);
        const { id } = topComponent;
        if (topLevelComponents.has(id) === false) topLevelComponents.set(id, topComponent);
    });

    // Identify top level components (ones without execution environments) and generate markup recursively.
    output += generateComponents(Array.from(topLevelComponents.values()), componentsToRender);
    // Filter in relationships that connect to an execution environment & generate markup.
    output += generateRelationships(Object.values(system.relationships));
    output += endUml();
    return output;
}