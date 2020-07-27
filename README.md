# TaskManager

## How does the version system works?

It's pretty simple, we check if local version is equal to version on github, and the backend take's care about everything else 

## Informations

OPEN SOURCE VERSION
Outdated version: https://github.com/YoungDaggerDee/ToDoApp-Outdated
The reason i created a new repository was, because i had unsolvable it problem in there :(
Keep on mind that this app was designed and created on MacOS, that means that it doesn't have to compatible.
This project doesnt contains any css file yet. Im using bootstrap 4.
This app can be was tested on macos and windows.

## NODEJS Packages

To install them all just type ( npm install ), that should do everything that's needed.
Some modules may not be used right now, but im working to get all of them used.
Feel free to remove unused modules.

- electron (builder / reload)
- reload
- opn
- readline ( used by update.js - npm run update )
- mysql
- nexe

## SETUP

### Start
To start this app, use command ( npm start )
Or type ( npm run ) to see all scripts :)
Or you can run any module with basic node command (for example node index.js)

## Build

To create build use npm run build, make sure that in package.json, you have "mode" set to "production" unless you wanna test it.

## Node Scripts

#### Start

- Run the app with everything that it need

#### Build

- Inside folder "Build" it creates the accual app

#### Update

- Create a new version with text news and insert object into version_log.json

#### Mode

- Fastest way how to switch between development and production mod in package.json

## Incoming features

- Language Options ( <select> with some most important languages )

- Database connection

- Database login

- Faster and Better code :) 

- Settings (backend)

## BUGS

#### You may get error from nodejs, that some module may be damaged.
Try to delete node_modules folder and then type into terminal npm install.
The solution will also be displayed in terminal, when you try to run the app.

@DanielSeiner, 2020
