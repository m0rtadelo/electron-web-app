# electron-web-app

**Skeleton solution to build totally hybrid apps (desktop and web).**

`WIP` This project is a example of a electron project that can be published as a web page too. Uses a basic framework that helps create views and components.

The client part has the global variable `window.api.electron` to check if runs in a Desktop electron app or web app.

The server part has the global variable `process.versions['electron']` to check if runs in a main electron process or in a server node instance.

**This is a Work In Progress POC example project that can be used as a skeleton for new projects**

## Diagrams
Client

    View                   Component A       Component C
    +---------------+     +------------+    +------------+
    |  Imperative   |     | Reactive   |    | Reactive   |
    |         +--+--+-----+          +-+-X--+ NOT WORKING| 
    |         +--+  |     +------------+    +------------+
    |               |     
    |               |
    |               |      Component B
    |               |     +------------+
    |         +--+--+-----+ Reactive   |
    |         +--+  |     |            |
    |               |     +------------+
    +---------------+

## Project Properties
* Uses Bootstrap5 as style
* Can use some kind of "Reactive" on components
* Can be "compiled" as desktop application or web application.
* The Desktop app (electron based) can run in all O.S.
* The web app (Single Page Application) can run in all modern browsers
* Typescript Source code (transpiled by babel)
* Modular
* Includes Views (pages) and Components (sub.pages)
* Components are reactive (a little)
* Includes tests (not fully)
* All written in Javascript/Typescript

# Installation

THis project is based on npm, yo must install all the dependencies before running with the next command:
> npm i

# Run

This project can be run as desktop app (electron) or a web solution (with server and client elements)

## Run as desktop

To run this app as a Desktop application (electron based), you should run:

> npm run desktop-app

## Run as web

To run this app as a Web based solution (Client / Server model), you should run:

> npm run web-app

And open a browser to http://localhost:4600/index.html

# More information

Electron apps are modeled with a **Main process** and a **Renderer process**. The main process are Node enabled and the Rendered process runs in a chromium sandbox.

This solution uses the Main process as a Server code and the Renderer process is used as a client code.

## Verbs

* GET - not used because we use a single enspoint that works with data
* POST - used to get data or do basic requests
* PUT - used to add new data to a collection
* PATCH - used to modify data from a collection
* DELETE - used to delete data from a collection

## Method and properties

### View

* getComponentById(id: string) = return the requested component
* getActiveComponent() = return the active component in the view (active in render pipeline not in focus)
* onReady() = Executes when the view has been rendered and is ready to use
* onChanges() = Executes when the view had changed (not the model)

### Component

* render(view, parent, dataToUSe?) = renders the component from the view onto the parent element
* return(html) = adds the rendered component to the view
* setAttribute(param, value) = sets/update attribute data on the component dom
* getAttribute(param) = returns the value from the component dom
* getData() = Returns the component data
* setData(newData) = Sets the component data