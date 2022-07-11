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
  deletePokemon
} from '../../database/dynamodbConnection'

export const handler = async (event) => {
  try {
    const { pokemonID } = getPathParameter(event)

    if (!pokemonID)
      return responseWithBadRequest('pokemonID não informado')

    const pokemon = await deletePokemon(pokemonID)

    if (!pokemon)
      return responseWithNotFound('Pokemon não encontrado')

    return responseWithSuccess(pokemon, 'Pokemon removido com sucesso')

  } catch (error) {
    const { message } = error
    return responseWithError(message)
  }
};