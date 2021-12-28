import { escapeString } from "../common/utils";
import { ComponentRelationship } from "./component-relationship";

export class Component implements ComponentConfiguration {
    label: string;
    private _id: string;
    type: ComponentType;
    stereotype?: string;
    color?: string;
    executionEnvironment?: Component;
    childComponents?: Array<Component>;
    childRelationships?: Array<ComponentRelationship>;
    constructor(label: string, config?: ComponentConfiguration) {
        this.label = config?.label || label;
        this.id = config?.id || label;
        this.type = config?.type;
        if (config?.stereotype) {
            this.stereotype = config.stereotype;
        }
        this.color = config?.color;
        this.childComponents = config?.childComponents || new Array();
        this.childRelationships = config?.childRelationships || new Array();
        this.executionEnvironment = config?.executionEnvironment;
    }

    public get id() {
        return this._id;
    }

    public set id(newId: string) {
        this._id = escapeString(newId);
    }
}

export class Database extends Component {
    executionEnvironment: ExecutionEnvironment;
    type = ComponentType.Database;
    stereotype: string = "Database";
}

export class Service extends Component {
    executionEnvironment: ExecutionEnvironment;
    type = ComponentType.Service;
    stereotype = "Service";
}

export class UI extends Component {
    executionEnvironment: ExecutionEnvironment;
    type = ComponentType.UI;
    stereotype = "UI";
}

export class API extends Component {
    executionEnvironment: ExecutionEnvironment;
    type = ComponentType.API;
}

export class Domain extends Component {
    type: ComponentType = ComponentType.ExecutionEnvironment;
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
    childRelationships?: Array<ComponentRelationship>;
}

export enum ComponentType {
    UI = "UI",
    Service = "Service",
    Database = "Database",
    ExecutionEnvironment = "Execution Environment",
    API = "API",
}