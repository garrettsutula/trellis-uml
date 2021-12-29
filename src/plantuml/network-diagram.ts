import { titleAndHeader, startUml, endUml } from "./chrome";
import { Component, ComponentType} from "../models/component"
import { ComponentRelationship } from "../models/component-relationship"
import { System } from "../models/system";

export function getNetworkDiagramType(type: ComponentType): string {
    switch(type) {
        case ComponentType.ExecutionEnvironment:
            return "node";
        default:
            throw new Error("only 'node' components are expected in network diagrams, possible bug?")
    }
}

export function generateComponentMarkup(component: Component) {
    let output = '';
    let renderComponentMarkup = true;
    if (component.type !== ComponentType.ExecutionEnvironment) renderComponentMarkup = false;
    const componentString = getNetworkDiagramType(component.type);
    if (renderComponentMarkup) {
        output += `${componentString} "${component.label}" as ${component.id} <<${component.stereotype || component.type}>>`;
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
    .reduce((output, component): string => output += generateComponentMarkup(component) + "\n", '');
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


export function generateNetworkDiagram(system: System): string {
    const executionEnvironmentComponents = Object.values(system.components).filter((component) => component.type === ComponentType.ExecutionEnvironment)
    if (executionEnvironmentComponents.length) {
        let output: string = startUml(`Network Diagram ${system.name}`);
        output += titleAndHeader(system.name, "Network");
        // Identify top level components (ones without execution environments) and generate markup recursively.
        output += generateComponents(executionEnvironmentComponents);
        // Filter in relationships that connect to an execution environment & generate markup.
        output += generateRelationships(Object.values(system.relationships));
        output += endUml();
        return output;
    }
    return "";
}