const nameToId = require("./lib/nameToId");


function preRecurseComponents(component, parent) {
  component.id = `${parent.id}.${nameToId(component.name)}`;
  component.system = { $ref: '#'};
  if(component.components)
    Object.values(component.components)
      .forEach((childComponent) => preRecurseComponents(childComponent, component));
}


function postRecurseComponents(component, system, systemContext) {
  if (!component.system) component.system = system;
  systemContext.components.add(component);
  if(component.components)
    Object.values(component.components).forEach((childComponent) => {
      postRecurseComponents(childComponent, component.system, systemContext);
    })
}

function recurseRunsIn(infrastructure, infrastructures) {
  infrastructures.add(infrastructure)
  if(infrastructure.runsIn) {
    if(!infrastructure.runsIn.ports && infrastructure.ports)
      infrastructure.runsIn.ports = Object.assign({}, infrastructure.ports);
    else if (infrastructure.runsIn.ports && infrastructure.ports)
      Object.assign(infrastructure.runsIn.ports, infrastructure.ports);
    if(!infrastructure.runsIn.runs)
      infrastructure.runsIn.runs = [];
    if(!infrastructure.runsIn.runs.some((existingInfraComponent) => existingInfraComponent === infrastructure))
      infrastructure.runsIn.runs.push(infrastructure);
    recurseRunsIn(infrastructure.runsIn, infrastructures);
  }

}

function preprocessFn(system = {}) {
  const {components = {}, relationships = [], runtime: runtimes = {}} = system;

  system.id = nameToId(system.name);

  Object.values(components).forEach((component) => {
    preRecurseComponents(component, system);
  });

  Object.values(runtimes).forEach((runtime) => {
    runtime.id = `${system.id}.${nameToId(runtime.name)}`;
  })
  // Adds system id
  return system;
}

function postprocessFn(system) {
  const {components = {}, relationships = []} = system;
  const systemContext = {
    components: new Set(),
    infrastructures: new Set(),
    relationships: {
      system: new Map(),
      component: new Map(),
      deployment: new Map(),
    }
  }

  Object.values(components).forEach((component) => {
    if(component.runtime) {
      if(!component.runtime.ports && component.ports)
        component.runtime.ports = Object.assign({}, component.ports);
      else if (component.runtime.ports && component.ports)
        Object.assign(component.runtime.ports, component.ports);
      if(!component.runtime.systems) 
        component.runtime.systems = [];
      if(!component.runtime.systems.some((system) => system === component.system))
        component.runtime.systems.push(component.system);
      recurseRunsIn(component.runtime, systemContext.infrastructures);
    }
    postRecurseComponents(component, component.system, systemContext);
  });
  relationships.forEach((relationship) => {
    const { source, target, type, interface} = relationship;
    relationship.id = {
      system: `${source.system.id}-${target.system.id}${type || ''}${interface || ''}`,
      component: `${source.id}-${target.id}${type || ''}${interface || ''}`
    }
    const isDifferentSystem = (source.system && source.system.id) !== target.system.id;
    systemContext.components.add(source);
    systemContext.components.add(target);
    if(source.runtime)
      recurseRunsIn(source.runtime, systemContext.infrastructures);
    if(target.runtime)
      recurseRunsIn(target.runtime, systemContext.infrastructures);
    if(!systemContext.relationships.system.has(relationship.id.system) && isDifferentSystem)
      systemContext.relationships.system.set(relationship.id.system, relationship);
    if(!systemContext.relationships.component.has(relationship.id.component))
      systemContext.relationships.component.set(relationship.id.component, relationship);

  });
  system.componentIds = Array.from(systemContext.components.values()).map((component) => component.id);
  system.systems = Array.from(new Set(Array.from(systemContext.components.values()).filter((component) => component.system).map((component) => component.system)).values());
  system.relationships = {
    system: Array.from(systemContext.relationships.system.values()),
    component: Array.from(systemContext.relationships.component.values()),
  }
  system.infrastructures = Array.from(systemContext.infrastructures.values());
  return system;
}

module.exports = {
  preprocessFn,
  postprocessFn,
};
