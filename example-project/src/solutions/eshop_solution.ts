import { solution } from 'trellisuml';
import { idSystem, basketSystem, catalogSystem, orderSystem, eshopSystem } from '../systems';


export default solution({
  name: 'Microsoft eShop',
  componentRelationships: [],
  systems: {
    idSystem,
    basketSystem,
    catalogSystem,
    orderSystem,
    eshopSystem,
  },
  systemRelationships: [],
})


/*
  accesses(clientBrowser, k8sCluster, "Ports: 443\\nProtcol:TCP"),
  accesses(clientMobileOS, k8sCluster, "Ports: 443\\nProtcol:TCP"),
  accesses(k8sCluster, sqlDatabase, "Ports: 1443\\nProtcol:TCP"),
*/