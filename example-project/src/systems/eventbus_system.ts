import { system, queue } from "trellisuml";
import { k8sCluster } from "../domains/domain";

export default system({
    name: "Event Bus",
    components: {
        eventBus: queue("Event Bus (Pub/Sub)", k8sCluster),
    },
})