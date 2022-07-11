import '../../database/mongodbConnection'

import {
  getPathParameter
} from '../../shared/validators'

import {
  responseWithError,
  responseWithSuccess,
  responseWithNotFound,
  responseWithBadRequest
} from '../../shared/responses'

import {
  getPokemonByID
} from '../../database/dynamodbConnection'

export const handler = async (event) => {
  try {
    const { pokemonID } = getPathParameter(event)

    if (!pokemonID)
      return responseWithBadRequest('pokemonID não informado')

    const pokemon = await getPokemonByID(pokemonID)

    if (!pokemon)
      return responseWithNotFound('Pokemon não encontrado')

    return responseWithSuccess(pokemon, 'Pokemon encontrado com sucesso')

  } catch (error) {
    const { message } = error
    return responseWithError(message)
  }
};
