import { Component } from "../models/component";
import { ComponentRelationship } from "./component-relationship";
import { escapeString } from "../common/utils";

export class System implements SystemConfiguration {
    name: string;
    _id: string;
    color?: string;
    components: Array<Component>;
    relationships: Array<ComponentRelationship>;
    systemDependencies?: {
        systems?: Array<System>,
        relationships?: Array<ComponentRelationship>,
    }
    constructor(config: SystemConfiguration) {
        this.name = config.name;
        this.id = config.name;
        this.components = config.components;
        this.relationships = config.relationships;
        this.systemDependencies = config?.systemDependencies || { systems: [], relationships: []};
    }
    public get id() {
        return this._id;
    }

    public set id(newId: string) {
        this._id = escapeString(newId);
    }
}

export interface SystemConfiguration {
    name: string;
    id?: string;
    color?: string;
    components: Array<Component>;
    relationships: Array<ComponentRelationship>;
    systemDependencies?: {
        systems?: Array<System>,
        relationships?: Array<ComponentRelationship>
    }
}
