import {HttpErrors} from "@loopback/rest/dist";

export default class Rest {
    //200
    RestSuccess(data?: any) {
        return {
            "status": 1,
            "data": data
        }
    }
    //400

    RestDataInvalid(msg?: any) {
        return {
            "status": -1,
            //"message: msg,
            "data": {
                "statusCode": 400,
                "name": 'DataInvalid',
                "message": msg
            }
        }
    }
    
    RestBadRequest(msg?: any) {
        return {
            "status": 0,
            //"message: msg,
            "data": {
                "statusCode": 400,
                "name": 'BadRequestError',
                "message": msg
            }
        }
    }

    //401
    RestAuth(msg?: any) {
        return {
            "status": 0,
            // message: msg,
            "data": {
                "statusCode": 401,
                "name": 'UnauthorizedError',
                "message": msg
            }
        }
    }

    //403
    RestForbidden(msg?: any) {
        return {
            "status": 0,
            // message: msg,
            "data": {
                "statusCode": 403,
                "name": 'ForbiddenError',
                "message": msg
            }
        }
    }

    //404
    RestNotFound(msg?: any) {
        return {
            "status": 0,
            "message": msg,
            "data": {
                "statusCode": 404,
                "name": 'NotFoundError',
                "message": msg
            }
        }
    }

    //500
    RestServerError(msg?: any) {
        return {
            "status": 0,
            // message: msg,
            "data": {
                "statusCode": 500,
                "name": 'ServerError',
                "message": msg
            }
        }
    }
}
