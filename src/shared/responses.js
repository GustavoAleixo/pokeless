export const STATUS_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    ERROR: 500
}

export const responseWithError = (message) => {
    return {
        statusCode: STATUS_CODE.ERROR,
        body: JSON.stringify({
            message
        })
    }
}

export const responseWithBadRequest = (message) => {
    return {
        statusCode: STATUS_CODE.BAD_REQUEST,
        body: JSON.stringify({
            message
        })
    }
}

export const responseWithNotFound = (message) => {
    return {
        statusCode: STATUS_CODE.NOT_FOUND,
        body: JSON.stringify({
            message
        })
    }
}

export const responseWithConflict = (message) => {
    return {
        statusCode: STATUS_CODE.CONFLICT,
        body: JSON.stringify({
            message
        })
    }
}

export const responseWithSuccess = (data, message) => {
    return {
        statusCode: STATUS_CODE.SUCCESS,
        body: JSON.stringify({
            data,
            message
        })
    }
}