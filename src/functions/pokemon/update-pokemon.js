import '../../database/mongodbConnection'
import * as Yup from 'yup'

import { PokemonModel } from '../../models/pokemon';

import {
  getBody,
  getPathParameter,
  errorValidator,
  validateID
} from '../../shared/validators'

import {
  STATUS_CODE,
  responseWithError,
  responseWithSuccess,
  responseWithNotFound,
  responseWithBadRequest
} from '../../shared/responses'

let bodyValidade = Yup.object().shape({
  name: Yup.string().required(),
  level: Yup.number().required()
})

export const handler = async (event) => {
  try {
    const { pokemonID } = getPathParameter(event)
    const isValidID = pokemonID && validateID(pokemonID)
    if (!isValidID)
      return responseWithBadRequest('pokemonID inválido')

    const body = getBody(event)
    await bodyValidade.validate(
      body,
      {
        abortEarly: false // Ao estar desativado retorna todos os erros de uma só vez
      }
    )

    const { nome, level } = body
    const pokemon = await PokemonModel.findByIdAndUpdate(pokemonID, { nome, level })

    if (!pokemon)
      return responseWithNotFound('Pokemon não encontrado')

    return responseWithSuccess(pokemon, 'Pokemon atualizado com sucesso')

  } catch (error) {
    const { statusCode, message } = errorValidator(error)

    if (STATUS_CODE.BAD_REQUEST === statusCode)
      return responseWithBadRequest(message)

    return responseWithError(message)
  }
};
