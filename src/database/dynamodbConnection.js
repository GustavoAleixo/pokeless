import 'dotenv/config'
import AWS from 'aws-sdk'

AWS.config.update({
    region: process.env.AWS_REGION_LOCATION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'pokeless'

export const getPokemons = async () => {
    const params = {
        TableName: TABLE_NAME
    }
    
    const pokemons = await dynamoClient.scan(params).promise()

    return pokemons
}

export const getPokemonByID = async (pokemonID) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: pokemonID
        }
    }
    
    const pokemons = await dynamoClient.get(params).promise()

    return pokemons
}

export const addOrUpdatePokemon = async (pokemon) => {
    const params = {
        TableName: TABLE_NAME,
        Item: pokemon
    }

    return await dynamoClient.put(params).promise()
}

export const deletePokemon = async (pokemonID) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: pokemonID
        }
    }

    return await dynamoClient.delete(params).promise()
}