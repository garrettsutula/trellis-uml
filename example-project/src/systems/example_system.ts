import { system, ui, service, database, device, connectsTo } from "../../../dist/app";;
// These would typically be defined in a "domain" diagram & imported from that diagram instead of defined here.
// because they are likely re-used by other components in other systems/solutions
const [ clientDevice, appServer, dbServer ] = device([
    { label: "Mobile App" },
    { label: "Application Server"},
    { label: "Database Server"}
]);
 
const name = "Appointments";
// parentComponents are defined here to place the component in the broader context of the systems & infrastructure.
export const apptApp = ui(`${name} App`, clientDevice); 
export const apptService = service(`${name} Service`, appServer);
export const apptDb = database(`${name} Database`, dbServer);

// Defined as needed for every connection between systems. De-duplicated when rendered as puml.
export const componentRelationships = [
    connectsTo(apptApp, apptService),
    connectsTo(apptService, apptDb),
    connectsTo(clientDevice, appServer, "Ports: 443\\nProtcol:TCP"),
    connectsTo(appServer, dbServer, "Ports: 1443\\nProtcol:TCP")
]

export default system({
    name,
    components: [
        apptApp,
        apptService,
        apptDb,
    ],
    componentRelationships,
});
