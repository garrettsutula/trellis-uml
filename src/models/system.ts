import { Component } from "../models/component";
import { ComponentRelationship } from "./component-relationship";
import { escapeString } from "../common/utils";

export class System implements SystemConfiguration {
    name: string;
    _id: string;
    color?: string;
    components: { [key: string]: Component };
    relationships: { [key: string]: ComponentRelationship };
    systemDependencies?: {
        systems?: { [key: string]: System },
        relationships?: { [key: string]: ComponentRelationship }
    }
    constructor(config: SystemConfiguration) {
        this.name = config.name;
        this.id = config.name;
        this.components = config.components;
        this.relationships = config.relationships;
        this.systemDependencies = config?.systemDependencies || { systems: {}, relationships: {}};
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
    components: { [key: string]: Component };
    relationships: { [key: string]: ComponentRelationship };
    systemDependencies?: {
        systems?: { [key: string]: System },
        relationships?: { [key: string]: ComponentRelationship }
    }
}
