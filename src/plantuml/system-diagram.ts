import { titleAndHeader, startUml, endUml } from "./chrome";
import { ComponentRelationship } from "../models/component-relationship"
import { System } from "../models/system";

export function generateComponentMarkup(system: System) {
    let output = '';
    output += `package "${system.name}" as ${system.id + "_package"} <<System>>`;
    if(system.color) output += " #" + system.color; 
    return output;
}

function generateRelationshipMarkup(relationship: ComponentRelationship): string {
    // TODO: Implement config interface
    let output = `${relationship.source.id} ${relationship.diagramFragmentBefore}${relationship.diagramFragmentAfter} ${relationship.target.id}`;
    if (relationship.description) output += `: ${relationship.description}`;
    return output + "\n";
}

function generateComponents(systems: Array<System>) {
    return systems
    .reduce((output, system): string => output += generateComponentMarkup(system) + "\n", '');
}

function generateRelationships(relationships: Array<ComponentRelationship>): string {
    const relationshipsAlreadyAdded = [];
    return relationships
        .reduce((output, relationship): string => {
            const newLine = generateRelationshipMarkup(relationship);
            if (!relationshipsAlreadyAdded.includes(newLine)) output += newLine;
            return output;
        }, '');
}


export function generateSystemDiagram(system: System): string {
    let output: string = startUml(`System Diagram ${system.name}`);
    output += titleAndHeader(system.name, "System");
    // Identify top level components (ones without execution environments) and generate markup recursively.
    output += generateComponents([system, ...Object.values(system.systemDependencies.systems)]);
    // Filter in relationships that connect to an execution environment & generate markup.
    output += generateRelationships(Object.values(system.systemDependencies.relationships));
    output += endUml();
    return output;
}