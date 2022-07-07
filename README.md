# POKELESS

Built for study purposes, pokeless is a serverless framework application that uses lambda functions linked to AWS

## Installation

Install the serverless framework using:

```bash
  npm install -g serverless
```
    
## Environment variables

To run this project, you will need to add the following environment variables to your `.env`

`LAYER_BUCKET`
`AWS_API_GATEWAY_REST_ID`
`AWS_API_GATEWAY_REST_ROOT_RESOURCE_ID`
`AWS_REGION_LOCATION`
`LOCAL_PORT`
`API_NAME`
`STAGE`
`MONGO_DB_URL`

## Running locally

Clone the project:

```bash
  git clone https://github.com/GustavoAleixo/pokeless.git
```

Enter the project directory:

```bash
  cd pokeless
```

Install dependencies:

```bash
  npm install
```

In the root of the project create a file called `.env.development` and add the environment variables with their respective values.

Start the server:

```bash
  npm run local
```

## Subindo mongoDB localmente

Make sure you have docker installed on your machine and run the command below:

```bash
  docker run -p 27017:27017 --name mongo mongo:3.6
```

With this command, a docker container will be created containing mongoDB locally on port 27017, once the database is created, a URI will be created below the `MO_DB_URL` environment found in the `.env.development` file

```bash
    MONGO_DB_URL=mongodb://localhost:27017/pokemondb
```

## Endpoints

`[POST] /dev/pokemon/{pokemonID}`: Create new pokemon
`[PUT] /dev/pokemon/{pokemonID}`: Update a pokemon
`[DELETE] /dev/pokemon/{pokemonID}`: Delete a pokemon
`[GET] - /dev/pokemon/{pokemonID}`: Get a expefic pokemon
`[GET] - /dev/pokemon`: List all pokemons
