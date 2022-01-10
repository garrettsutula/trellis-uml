import { executionEnvironment, service, database, system, componentRelationships } from "trellisuml";
const { requires } = componentRelationships;
import { k8sCluster, sqlRdbms } from "../domains/domain";
import { default as eventBusSystem } from './eventbus_system';
const { components: { eventBus } } = eventBusSystem;

export const catalogContainer = executionEnvironment("Catalog Container", k8sCluster);
export const catalogService = service("Catalog Service", catalogContainer);
export const catalogDatabase = database("Catalog DB (SQL)", sqlRdbms);

export default system({
    name: "Catalog",
    components: {
        catalogContainer,
        catalogService,
        catalogDatabase,
        eventBus,
    },
    componentRelationships: [
        requires(catalogService, catalogDatabase),
        requires(catalogService, eventBus),
    ],
});