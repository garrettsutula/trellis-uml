import { executionEnvironment, service, database, system, componentRelationships } from "trellisuml";
const { requires } = componentRelationships;
import { k8sCluster, sqlRdbms } from "../domains/domain";
import { default as eventBusSystem } from './eventbus_system';
const { components: { eventBus } } = eventBusSystem;

export const idContainer = executionEnvironment("Identity Container", k8sCluster );
export const idService = service("Identity Service", idContainer);
export const idDatabase = database("Identity DB (SQL)", sqlRdbms);

export default system({
    name: "Identity",
    components: {
        idContainer,
        idService,
        idDatabase,
        eventBus,
    },
    componentRelationships: [
        requires(idService, idDatabase),
        requires(idService, eventBus),
    ],
});