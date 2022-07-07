import '../../database/mongodbConnection'

import { PokemonModel } from '../../models/pokemon';

import {
  getPathParameter,
  validateID
} from '../../shared/validators'

import {
  responseWithError,
  responseWithSuccess,
  responseWithNotFound,
  responseWithBadRequest
} from '../../shared/responses'

export const handler = async (event) => {
  try {
    const { pokemonID } = getPathParameter(event)

    const isValidID = pokemonID && validateID(pokemonID)
    if (!isValidID)
      return responseWithBadRequest('pokemonID inválido')

    const pokemon = await PokemonModel.findByIdAndDelete(pokemonID)

    if (!pokemon)
      return responseWithNotFound('Pokemon não encontrado')

    return responseWithSuccess(pokemon, 'Pokemon removido com sucesso')

  } catch (error) {
    const { message } = error
    return responseWithError(message)
  }
};