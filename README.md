# Triki Maps  
![Logo](https://github.com/SpinnyFinny/maps-wiki/blob/master/docs/images/triki-map-logo.png)

Triki Maps is a web app that allows users to collaboratively create maps which list multiple "points", for example, "Best micro-breweries in Vancouver", or "Best hiking spots". 

All maps are visible whether you are authorized user or not. When a an authorized user changes a map by adding, moving, updating or deleting a point, the user's profile changes so that he is identified as a contributor to the map. Authorized users can also favourite maps. 

The functional requirements, and their status can be found [here](https://github.com/SpinnyFinny/maps-wiki/blob/master/docs/Functional%20Requirements.md). 

Documentation can be found docs/index.html once you download the project. 

## Screen Shots
![Main Screen](https://github.com/SpinnyFinny/maps-wiki/blob/master/docs/images/screen_shot_main.png) "Main")

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run latest`
6. Run the seed: `npm run seed`
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- body-parser
- cookie-session
- dotenv
- ejs
- express
- jsdoc
- knex
- knex-logger
- morgan
- node-sass-middleware
- pg
