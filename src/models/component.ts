import { System } from ".";
import { escapeString } from "../common/utils";

export class Component implements ComponentConfiguration {
    label: string;
    private _id: string;
    type: ComponentType;
    stereotype?: string;
    color?: string;
    system?: System;
    private _parentComponent?: Component;
    childComponents?: Component[];
    constructor(label: string, config?: ComponentConfiguration) {
        this.label = config?.label || label;
        this.id = config?.id || label;
        this.type = config?.type;
        if (config?.stereotype) {
            this.stereotype = config.stereotype;
        }
        this.color = config?.color;
        this.childComponents = config?.childComponents || new Array();
        this.parentComponent = config?.parentComponent;
    }

    public get id() {
        return this._id;
    }

    public set id(newId: string) {
        this._id = escapeString(newId);
    }

    public get parentComponent() {
        return this._parentComponent;
    }

    public set parentComponent(newEnvironment: Component) {
        if ((newEnvironment && newEnvironment?.id) !== this?.parentComponent?.id) {
            const indexOfComponent = this.parentComponent?.childComponents.findIndex(({ id }) => this.id === id);
            if (indexOfComponent > -1) {
                this.parentComponent.childComponents.splice(indexOfComponent, 1);
            }
            this._parentComponent = newEnvironment;
        }
        if (this.parentComponent?.childComponents.findIndex(({ id }) => this.id === id) == -1) {
            this.parentComponent.childComponents.push(this);
        }
    }
}

export class Database extends Component {
    type = ComponentType.Database;
    stereotype: string = "Database";
}

export class Schema extends Component {
    type = ComponentType.Schema;
    stereotype: string = "Schema";
}

export class Service extends Component {
    type = ComponentType.Service;
    stereotype = "Service";
}

export class UI extends Component {
    type = ComponentType.UI;
    stereotype = "UI";
}

export class API extends Component {
    type = ComponentType.API;
}

export class Queue extends Component {
    type = ComponentType.Queue;
}

export class Cache extends Component {
    type = ComponentType.Database;
    stereotype = "Cache";
}

export class Processor extends Component {
    type = ComponentType.Processor;
    stereotype = "Processor";
}

export class Domain extends Component {
    type = ComponentType.ExecutionEnvironment;
    stereotype = "Domain";
}

export class Device extends Domain {
    stereotype = "Device";
}

export class ExecutionEnvironment extends Domain {
    stereotype = "Execution Environment";
}

export interface ComponentConfiguration {
    label?: string;
    id?: string;
    type?: ComponentType;
    stereotype?: string;
    color?: string;
    parentComponent?: Component;
    childComponents?: Array<Component>;
}

export enum ComponentType {
    UI = "UI",
    Service = "Service",
    Database = "Database",
    ExecutionEnvironment = "Execution Environment",
    API = "API",
    Queue = "Queue",
    Processor = "Processor",
    Schema = "Schema",
}