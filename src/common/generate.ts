import { writeFileSync } from "fs";
import { System } from "../models/system";
import { generateComponentDiagram } from "../plantuml/component-diagram";
import { generateNetworkDiagram } from "../plantuml/network-diagram";
import { labelToId } from "./utils";
import * as Path from 'path';

export function generateSystemDiagrams(system: System) {
    const diagrams = [
        generateComponentDiagram(system),
        generateNetworkDiagram(system),
    ];

    const output = diagrams.join("\n''''''''''''''''''''''''''''''\n");
    const path = Path.join(process.cwd(), `./diagrams/systems/${labelToId(system.name)}.puml`);
    writeFileSync(path, output);
}