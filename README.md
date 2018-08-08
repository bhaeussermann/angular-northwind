# Northwind

This is a simple CRUD application for managing the Employees in a standard Northwind database.

The application interfaces with a REST service that is hosted by an application deployed in [Linx](https://linx.software/) (see REST service/Deployment section below).

## Angular app

### Development server

Change to the `web` folder and run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Change to the `web` folder and run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Change to the `web` folder and run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## REST service

### Deployment

To deploy the REST service, install [Linx](https://linx.software/), and deploy the Linx solution file `service/Northwind.lsoz` onto your Linx Server.
