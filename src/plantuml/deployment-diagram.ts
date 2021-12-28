import { titleAndHeader, startUml, endUml } from "./chrome";
import { Component, ComponentType} from "../models/component"
import { ComponentRelationship } from "../models/component-relationship"
import { System } from "../models/system";
import { escapeString } from "../common/utils";


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
        case ComponentType.API:
            return "interface";
        default:
            return "component";
    }
}

export function generateComponentMarkup(component: Component) {
    let output = '';
    const componentString = getNetworkDiagramType(component.type);
    output += `${componentString} "${component.label}" as ${escapeString(component.id)}`;
    if(component.stereotype) output += ` <<${component.stereotype}>>`;
    if(component.color) output += " #" + component.color; 
    if (component.childComponents.length) {
        output += " {\n";
        component.childComponents.forEach((component) => {
            output += generateComponentMarkup(component) + "\n"
        })
        if (component.childRelationships.length) {
            component.childRelationships.forEach((relationship) => {
                output += generateRelationshipMarkup(relationship);
            });
        }
        output += "}";
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
    // Add child components to their execution environments as desginated on instantiated components.
    components
    .forEach((component) => {
        if (component.executionEnvironment) {
            component.executionEnvironment.childComponents.push(component);
        }
    });
    return components
    .filter((component) => component.executionEnvironment === undefined)
    .reduce((output, component): string => output += generateComponentMarkup(component) + "\n", '');
}

function generateRelationships(relationships: Array<ComponentRelationship>): string {
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


export function generateDeploymentDiagram(system: System): string {
    let output: string = startUml(`Deployment Diagram ${system.name}`);
    output += titleAndHeader(system.name, "Network");
    // Identify top level components (ones without execution environments) and generate markup recursively.
    output += generateComponents(Object.values(system.components));
    // Filter in relationships that connect to an execution environment & generate markup.
    output += generateRelationships(Object.values(system.relationships));
    output += endUml();
    return output;
}