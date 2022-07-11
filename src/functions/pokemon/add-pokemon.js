import '../../database/mongodbConnection'
import * as Yup from 'yup'
import * as uuid from 'uuid'

import { PokemonModel } from '../../models/pokemon';

import {
  getBody,
  errorValidator
} from '../../shared/validators'

import {
  STATUS_CODE,
  responseWithError,
  responseWithSuccess,
  responseWithConflict,
  responseWithBadRequest
} from '../../shared/responses'

import {
  addOrUpdatePokemon
} from '../../database/dynamodbConnection'

let bodyValidade = Yup.object().shape({
  name: Yup.string().required(),
  level: Yup.number().required()
})

export const handler = async (event) => {
  try {
    const body = getBody(event)

    await bodyValidade.validate(
      body,
      {
        abortEarly: false // Ao estar desativado retorna todos os erros de uma só vez
      }
    )

    const { name, level } = body
    const pokemon = await addOrUpdatePokemon({
      id: uuid.v4(),
      name,
      level
    })

    // const exists = await PokemonModel.findOne({ name })

    // if (exists)
    //   return responseWithConflict('Já existe um pokemon com este mesmo nome')

    // const pokemon = await PokemonModel.create({ name, level })

    return responseWithSuccess(pokemon, 'Pokemon inserido com sucesso')

  } catch (error) {
    const { statusCode, message } = errorValidator(error)

    if (STATUS_CODE.BAD_REQUEST === statusCode)
      return responseWithBadRequest(message)

    return responseWithError(message)
  }
};
