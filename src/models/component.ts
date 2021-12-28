import { DiagramType } from "./diagram";
import { generateComponentMarkup as componentMarkup, generateComponentRelationship as componentRelationship } from "../plantuml/component-diagram";
import { generateNetworkMarkup as networkMarkup, generateNetworkRelationship as networkRelationship } from "../plantuml/network-diagram";

import { labelToId } from "../common/utils";

export class Component {
    label: string;
    id?: string;
    type: ComponentType;
    stereotype?: string;
    color?: string;
    executionEnvironment?: Component;
    childComponents?: Array<Component>;
    childRelationships?: Array<ComponentRelationship>
    constructor(label: string, config?: ComponentConfiguration) {
        this.label = config?.label || label;
        this.id = labelToId(config?.id || label);
        this.type = config?.type;
        this.stereotype = config?.stereotype
        this.color = config?.color;
        this.childComponents = config?.childComponents;
        this.childRelationships = config?.childRelationships;
    }
    toMarkup(type: DiagramType): string {
        switch(type) {
            case DiagramType.Network:
                return networkMarkup(this);
            case DiagramType.Component:
            default:
                return componentMarkup(this);
        }
    }
}

export class Database extends Component {
    executionEnvironment: ExecutionEnvironment;
    type = ComponentType.Database;
}

export class Service extends Component {
    executionEnvironment: ExecutionEnvironment;
    type = ComponentType.Service;
}

export class UI extends Component {
    executionEnvironment: ExecutionEnvironment;
    type = ComponentType.UI;
}

export class Domain extends Component {
    type = ComponentType.ExecutionEnvironment;
    stereotype = "Domain";
}

export class Device extends Domain {
    executionEnvironment: Domain;
    stereotype = "Device";
}

export class ExecutionEnvironment extends Domain {
    executionEnvironment: Device;
    stereotype = "Execution Environment";
}



interface ComponentConfiguration {
    label?: string;
    id?: string;
    type?: ComponentType;
    stereotype?: string;
    color?: string;
    executionEnvironment?: Component;
    childComponents?: Array<Component>;
    childRelationships?: Array<ComponentRelationship>
}

export interface ComponentRelationship {
    source: Component;
    target: Component;
    toMarkup(type: DiagramType): string;
}

export class Uses implements ComponentRelationship {
    source: Component;
    target: Component;
    constructor(source: Component, target: Component) {
        this.source = source;
        this.target = target;
    }
    toMarkup(type: DiagramType): string {
        switch(type) {
            case DiagramType.Network:
                return networkRelationship(this);
            case DiagramType.Component:
            default:
                return componentRelationship(this);
        }
        
    }
}

export enum ComponentType {
    UI = "UI",
    Service = "Service",
    Database = "Database",
    ExecutionEnvironment = "Execution Environment",
}