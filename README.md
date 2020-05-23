# TEAM-076 BACKEND

[![Codacy Badge](https://img.shields.io/badge/Code%20Quality-D-red)](https://img.shields.io/badge/Code%20Quality-D-red)


## About



Once this repo has been setup on Codacy by the TTL, replace the above badge with the actual one from the Codacy dashboard, and add the code coverage badge as well. This is mandatory

A Nodejs backend application for Team-076. The setup contains

- Jest: For runnung tests. We strongly recommend that JavaScript projects use Jest

- Eslint & Prettier: For formatting code to match ESlint AirBnB coding standard. You might need to install the ESlint and Prettier plugins for your code editor to make the most of these utilities

## Why

Talk about what problem this solves, what SDG(s) and SGD targets it addresses and why these are imoirtant

## Usage

### API
  - **POST** /api/register
    - Use Case: to create a new user
    - Protected: none
    - Input Data Structure: `{
      name: <String>,
      farmingType: <String>,
      username: <String>,
      password: <String>
    }`
    - Returns: `{
      success: <Boolean>,
      message: <String>
    }`

  - **GET** /api/register/farmingTypes
    - Use Case: to get an array of available farming types
    - Protected: none
    - Input Data Structure: none
    - Returns: `{
      success: <Boolean>,
      data: {
        farmingTypes: Array<String>
      }`
    }
  
  - **GET** /api/register/checkUsername
    - Use Case: to test if a username has already been registered with
    - Protected: none
    - Input Data Structure: `{
      username: <String>
    }`
    - Returns: `{
      success: <boolean>,
      message: <String>
    }`
    
  - **POST** /api/login
    - Use Case: to get the token for a registered user to make authenticated requests
    - Protected: none
    - Input Data Structure: `{
      username: <String>,
      password: <String>
    }`
    - Returns: `{
      success: <boolean>,
      message: <String>,
      data?: {
        token: <String>
      }
    }`
    - Notes: the token returned should be sent along as a bearer token when sending requests to protected routes


## Setup

Install `npm` or `yarn` if you dont have any of them already installed. We recommend Yarn though.

After clonning the repo to your local machine and moving into the cloned folder, Run `yarn install` to get started by installing dependencies.

Create a `.env` file in the root directory, copy all keys from the `.env.example` and put in appropriate values.

Setup database connection properties in `src/config/database.js`.

For the first time:
- run `npx sequelize-cli db:create`  to create the database for the current environment.
- run `npx sequelize-cli db:migrate` to setup the tables.
- run `npx sequelize-cli db:drop` to remove the database and delete all tables and data (make sure you know what you're doing. should only be run in development).

`src/server.js` is the entry to the project and source code should go into the `src` folder.

All tests should be written in the `__tests__' folder. There's a sample in there.

This starter uses [Parcel](https://parceljs.org/getting_started.html) as the bundler. It is much simpler that WebPack and the others

#### Hints

- Run `npm install` or `yarn install` to get started. We'll assume you are using Yarn.
- Install additional dependencies: `yarn add <dependency-name> [-D]`
- Run tests: `yarn test`
- Run tests with test coverage info: `yarn test:cover`
- Check the codebase for proper syntax and formatting compliance: `yarn lint`
- Run your app in local dev mode: `yarn start`. 

## Authors

List the team behind this project. Their names linked to their Github, LinkedIn, or Twitter accounts should siffice. Ok to signify the role they play in the project, including the TTL and mentor

## Contributing
If this project sounds interesting to you and you'd like to contribute, thank you!
First, you can send a mail to buildforsdg@andela.com to indicate your interest, why you'd like to support and what forms of support you can bring to the table, but here are areas we think we'd need the most help in this project :
1.  area one (e.g this app is about human trafficking and you need feedback on your roadmap and feature list from the private sector / NGOs)
2.  area two (e.g you want people to opt-in and try using your staging app at staging.project-name.com and report any bugs via a form)
3.  area three (e.g here is the zoom link to our end-of sprint webinar, join and provide feedback as a stakeholder if you can)

## Acknowledgements

Did you use someone else’s code?
Do you want to thank someone explicitly?
Did someone’s blog post spark off a wonderful idea or give you a solution to nagging problem?

It's powerful to always give credit.

## LICENSE
MIT

