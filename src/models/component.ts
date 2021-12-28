import { escapeString } from "../common/utils";
import { ComponentRelationship } from "./component-relationship";

export class Component implements ComponentConfiguration {
    label: string;
    private _id: string;
    type: ComponentType;
    stereotype?: string;
    color?: string;
    private _executionEnvironment?: Component;
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

    public get executionEnvironment() {
        return this._executionEnvironment;
    }

    public set executionEnvironment(newEnvironment: Component) {
        if ((newEnvironment && newEnvironment?.id) !== this?.executionEnvironment?.id) {
            const indexOfComponent = this.executionEnvironment?.childComponents.findIndex(({ id }) => this.id === id);
            if (indexOfComponent > -1) {
                this.executionEnvironment.childComponents.splice(indexOfComponent, 1);
            }
            this._executionEnvironment = newEnvironment;
        }
        if (this.executionEnvironment?.childComponents.findIndex(({ id }) => this.id === id) == -1) {
            this.executionEnvironment.childComponents.push(this);
        }
    }
}

export class Database extends Component {
    type = ComponentType.Database;
    stereotype: string = "Database";
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

export class Domain extends Component {
    type: ComponentType = ComponentType.ExecutionEnvironment;
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