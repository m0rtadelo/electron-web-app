# electron-web-app

**Skeleton solution to build totally hybrid apps (desktop and web).**

`WIP` This project is a example of a electron project that can be published as a web page too. Uses a basic framework that helps create views and components.

The client part has the global variable `window.api.electron` to check if runs in a Desktop or web app.

The server part has the global variable `process.env` to check if runs in a main electron process or in a server node instance.


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
