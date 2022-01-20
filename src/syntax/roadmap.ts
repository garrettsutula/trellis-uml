import { Roadmap, RoadmapConfiguration } from '../models';

export function roadmap(config: RoadmapConfiguration): Roadmap {
  return new Roadmap(
    config.name,
    config.description,
    config.solutions,
    config.phases,
  );
}
