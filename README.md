# Northwind

This is a simple CRUD application for managing the Employees in a standard Northwind database. It is hosted 
[here](https://angular-northwind.herokuapp.com/) as a quick preview.

The application interfaces with a [REST service hosted via Express in Node.js](https://github.com/bhaeussermann/northwind-api).

It connects to where the API is hosted [here](https://northwind-express-api.herokuapp.com/swagger/) by default, but this can be changed
in `src/proxy.conf.json` if you're hosting the API yourself.

## Project setup
```
npm install
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
