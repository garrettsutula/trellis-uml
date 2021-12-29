import { writeFileSync } from "fs";
import { System } from "../models/system";
import { generateComponentDiagram } from "../plantuml/component-diagram";
import { generateNetworkDiagram } from "../plantuml/network-diagram";
import { generateSystemDiagram } from "../plantuml/system-diagram";
import { generateDeploymentDiagram } from "../plantuml/deployment-diagram";
import { escapeString } from "./utils";
import * as Path from 'path';


export function generateSystemDiagrams(system: System, path: string) {
    const diagrams = [
        generateNetworkDiagram(system),
        generateDeploymentDiagram(system),
        generateComponentDiagram(system),
        generateSystemDiagram(system),
    ];

    const output = diagrams.join("\n''''''''''''''''''''''''''''''\n");
    writeFileSync(path, output);
}