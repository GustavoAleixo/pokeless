import '../../database/mongodbConnection'

import { PokemonModel } from '../../models/pokemon';

import {
  responseWithError,
  responseWithSuccess
} from '../../shared/responses'

export const handler = async () => {
  try {
    const pokemons = await PokemonModel.find({})

    if (pokemons.length === 0)
      return responseWithSuccess([], 'Nenhum pokemon encontrado')

    return responseWithSuccess(pokemons, 'Pokemons encontrados com sucesso')

  } catch (error) {
    const { message } = error
    return responseWithError(message)
  }
};
