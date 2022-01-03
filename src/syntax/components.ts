import { API, Cache, Component, ComponentConfiguration, Database, Device, Domain, ExecutionEnvironment, Processor, Queue, Service, UI } from "../models";
export { ComponentType } from '../models';


export function ui(label: string, parentComponent?: Component): UI;
export function ui(config: ComponentConfiguration): UI;
export function ui(config: ComponentConfiguration[]): UI[];
export function ui(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): UI | UI[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((uiConfig) => new UI(uiConfig.label, uiConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new UI(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new UI(config.label, config);
        }
    }
}

export function database(label: string, parentComponent?: Component): Database;
export function database(config: ComponentConfiguration): Database;
export function database(config: ComponentConfiguration[]): Database[];
export function database(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): Database | Database[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new Database(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new Database(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new Database(config.label, config);
        }
    }
}

export function service(label: string, parentComponent?: Component): Service;
export function service(config: ComponentConfiguration): Service;
export function service(config: ComponentConfiguration[]): Service[];
export function service(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): Service | Service[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new Service(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new Service(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new Service(config.label, config);
        }
    }
}

export function api(label: string, parentComponent?: Component): API;
export function api(config: ComponentConfiguration): API;
export function api(config: ComponentConfiguration[]): API[];
export function api(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): API | API[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new API(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new API(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new API(config.label, config);
        }
    }
}

export function queue(label: string, parentComponent?: Component): Queue;
export function queue(config: ComponentConfiguration): Queue;
export function queue(config: ComponentConfiguration[]): Queue[];
export function queue(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): Queue | Queue[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new Queue(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new Queue(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new Queue(config.label, config);
        }
    }
}

export function cache(label: string, parentComponent?: Component): Cache;
export function cache(config: ComponentConfiguration): Cache;
export function cache(config: ComponentConfiguration[]): Cache[];
export function cache(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): Cache | Cache[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new Cache(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new Cache(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new Cache(config.label, config);
        }
    }
}

export function processor(label: string, parentComponent?: Component): Processor;
export function processor(config: ComponentConfiguration): Processor;
export function processor(config: ComponentConfiguration[]): Processor[];
export function processor(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): Processor | Processor[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new Processor(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new Processor(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new Processor(config.label, config);
        }
    }
}

export function domain(label: string, parentComponent?: Component): Domain;
export function domain(config: ComponentConfiguration): Domain;
export function domain(config: ComponentConfiguration[]): Domain[];
export function domain(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): Domain | Domain[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new Domain(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new Domain(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new Domain(config.label, config);
        }
    }
}

export function device(label: string, parentComponent?: Component): Device;
export function device(config: ComponentConfiguration): Device;
export function device(config: ComponentConfiguration[]): Device[];
export function device(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): Device | Device[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new Device(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new Device(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new Device(config.label, config);
        }
    }
}

export function executionEnvironment(label: string, parentComponent?: Component): ExecutionEnvironment;
export function executionEnvironment(config: ComponentConfiguration): ExecutionEnvironment;
export function executionEnvironment(config: ComponentConfiguration[]): ExecutionEnvironment[];
export function executionEnvironment(labelOrConfig: string | ComponentConfiguration | ComponentConfiguration[], parentComponent?: Component): ExecutionEnvironment | ExecutionEnvironment[]  {
    if (labelOrConfig instanceof Array) {
        return labelOrConfig.map((dbConfig) => new ExecutionEnvironment(dbConfig.label, dbConfig));
    } else {
        if (typeof labelOrConfig === "string") {
            const label = labelOrConfig as string;
            return new ExecutionEnvironment(label, { parentComponent });
        } else {
            const config = labelOrConfig as ComponentConfiguration;
            return new ExecutionEnvironment(config.label, config);
        }
    }
}