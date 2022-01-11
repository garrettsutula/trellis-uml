import {
  executionEnvironment, ui, service, api, system, componentRelationships,
} from '../../../dist/app';
import {
  clientMobileOS, clientBrowser, k8sCluster, apiGatewayContainer,
} from '../domains/domain';
import { idService } from './identity_system';
import { catalogService } from './catalog_system';
import { orderService } from './ordering_system';
import { basketService } from './basket_system';

const { requires } = componentRelationships;

export const mobileApp = ui('eShop Mobile App', clientMobileOS);
export const spaWebApp = ui('eShop SPA Webapp', clientBrowser);
export const webApp = ui('eShop Traditional Webapp', clientBrowser);
export const webAppBffContainer = executionEnvironment('MVC Container', k8sCluster);
export const webAppBff = service('eShop Webapp MVC', webAppBffContainer);
export const mobileShoppingApi = api('Mobile Shopping API', apiGatewayContainer);
export const webShoppingApi = api('Web Shopping API', apiGatewayContainer);

export default system({
  name: 'Microsoft eShop System',
  components: {
    mobileApp,
    spaWebApp,
    webApp,
    webAppBffContainer,
    webAppBff,
    mobileShoppingApi,
    webShoppingApi,
    idService,
    catalogService,
    orderService,
    basketService,
  },
  componentRelationships: [
    requires(mobileApp, mobileShoppingApi),
    requires(webApp, webAppBff),
    requires(webAppBff, webShoppingApi),
    requires(spaWebApp, webShoppingApi),
    requires(mobileShoppingApi, idService),
    requires(mobileShoppingApi, catalogService),
    requires(mobileShoppingApi, orderService),
    requires(mobileShoppingApi, basketService),
    requires(webShoppingApi, idService),
    requires(webShoppingApi, catalogService),
    requires(webShoppingApi, orderService),
    requires(webShoppingApi, basketService),
  ],
});
