import * as Yup from 'yup'
import { STATUS_CODE } from './responses'

export const getBody = (event) => {
    if (event.body !== null && event.body !== undefined)
        return JSON.parse(event.body)
    else
        return {}
}

export const getPathParameter = (event) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined)
        return event.pathParameters
    else
        return {}
}

export const validateID = (id) => {
    return id.match(/^[0-9a-fA-F]{24}$/)
}

export const errorValidator = (error) => {
    if (error instanceof Yup.ValidationError)
        return { statusCode: STATUS_CODE.BAD_REQUEST, message: error.errors }

    return { statusCode: STATUS_CODE.ERROR, message: error.message }
}