# Example Trellis Project
This project creates diagrams fro the [Microsoft eShop on Containers](https://github.com/dotnet-architecture/eShopOnContainers/blob/dev/img/eShopOnContainers-architecture.png) project to demonstrate how [TrellisUML](https://github.com/garrettsutula/trellis-uml) can be used to describe a complex system with much less code than the resultant markup generated.

> At first measure, this project generates **538** lines of markup with **180** lines of typescript code - a savings of ***~66%***!

## Getting Started
To get started using this project locally, follow these instructions:

1. Make sure you have Node 12.14 or higher installed, ideally latest LTS.
2. Install [TrellisUML](https://github.com/garrettsutula/trellis-uml) globally by running `npm i -g trellisuml`.
3. Clone this repo and run `npm i` to install dependencies.
4. Run `trellis build` to build the diagrams from `./src` using.

## Example Diagrams

### Deployment Diagram
![Deployment Diagram Example](readme/Deployment%20Diagram%20Microsoft%20eShop%20System.png)

### Component Diagram
![Component Diagram Example](readme/Component%20Diagram%20Microsoft%20eShop%20System.png)

### System Diagram
![System Diagram Example](readme/System%20Diagram%20Microsoft%20eShop%20System.png)

### Network Diagram
![Network Diagram Example](readme/Network%20Diagram%20Microsoft%20eShop%20System.png)


