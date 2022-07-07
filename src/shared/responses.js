export const STATUS_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    ERROR: 500
}

export const responseWithError = (message) => {
    return JSON.stringify({
        status: STATUS_CODE.ERROR,
        message: message
    })
}

export const responseWithBadRequest = (message) => {
    return JSON.stringify({
        status: STATUS_CODE.BAD_REQUEST,
        message: message
    })
}

export const responseWithNotFound = (message) => {
    return JSON.stringify({
        status: STATUS_CODE.BAD_REQUEST,
        message: message
    })
}

export const responseWithConflict = (message) => {
    return JSON.stringify({
        status: STATUS_CODE.CONFLICT,
        message: message
    })
}

export const responseWithSuccess = (data, message) => {
    return JSON.stringify({
        status: STATUS_CODE.SUCCESS,
        data,
        message
    })
}