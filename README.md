# electron-web-app

**Skeleton solution to build totally hybrid apps (desktop and web).**

This project is a example of a electron project that can be published as a web page too.

# Installation

THis project is based on npm, yo must install all the dependencies before running with the next command:
> npm i

# Run

This project can be run as desktop app (electron) or a web solution (with server and client elements)

## Run as desktop

To run this app as a Desktop application (electron based), you should run:

> npm start

## Run as web

To run this app as a Web based solution (Client / Server model), you should run:

> npm serve

And open a browser to http://localhost:4600/index.html

# More information

Electron apps are modeled with a **Main process** and a **Renderer process**. The main process are Node enabled and the Rendered process runs in a chromium sandbox.

The Main process is used as a Server and the Renderer process is used as a client.
