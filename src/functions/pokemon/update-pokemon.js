import '../../database/mongodbConnection'
import * as Yup from 'yup'

import {
  getBody,
  errorValidator
} from '../../shared/validators'

import {
  STATUS_CODE,
  responseWithError,
  responseWithSuccess,
  responseWithNotFound,
  responseWithBadRequest
} from '../../shared/responses'

import {
  getPokemonByID,
  addOrUpdatePokemon
} from '../../database/dynamodbConnection'

let bodyValidade = Yup.object().shape({
  id: Yup.string().required(),
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

    const { id, name, level } = body
    const { Item } = await getPokemonByID(id)

    if (!Item)
      return responseWithNotFound('Pokemon não encontrado')
    
    const pokemon = await addOrUpdatePokemon({ id, name, level })

    if (pokemon)
    return responseWithSuccess(Item, 'Pokemon atualizado com sucesso')

  } catch (error) {
    const { statusCode, message } = errorValidator(error)

    if (STATUS_CODE.BAD_REQUEST === statusCode)
      return responseWithBadRequest(message)

    return responseWithError(message)
  }
};
