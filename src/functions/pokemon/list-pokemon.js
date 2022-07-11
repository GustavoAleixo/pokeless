import '../../database/mongodbConnection'

import {
  responseWithError,
  responseWithSuccess
} from '../../shared/responses'

import {
  getPokemons
} from '../../database/dynamodbConnection'

export const handler = async () => {
  try {

    const { Items } = await getPokemons()

    if (Items.length === 0)
      return responseWithSuccess([], 'Nenhum pokemon encontrado')

    return responseWithSuccess(Items, 'Pokemons encontrados com sucesso')

  } catch (error) {
    const { message } = error
    return responseWithError(message)
  }
};
