function validateObjectStringKeys(key, objectName) {
    return function (req, res, next) {
        const body = req.body.data;
        if (!body[key] || body[key].length === 0) {
            next({
                status: 400,
                message: `${objectName} must include a ${key}`
            })
        } else {
            next();
        }
    }
}

function validateObjectIntegerKeys(key, objectName) {
    return function (req, res, next) {
        const body = req.body.data;
        if (!body[key]) {
            next({
                status: 400,
                message: `Dish must include a ${key}`
            })
        } else if (typeof body[key] !== "number" || body[key] <= 0) {
            next({
                status: 400,
                message: `${objectName} must have a ${key} that is an integer greater than 0`
            })
        } else {
            next()
        }
    }
}

function validateObjectArrayKeys(key, objectName) {
    return function (req, res, next) {
        const body = req.body.data;
        if (!body[key]) {
            next({
                status: 400,
                message: `${objectName} must include a ${key}`
            })
        } else if (!Array.isArray(body[key]) || body[key].length === 0) {
            next({
                status: 400,
                message: `Dish must have a ${key} that is an integer greater than 0`
            })
        } else {
            next()
        }
    }
}

function isIdMatchingWithRouteId(idKey, objectName) {
    return function match(req, res, next) {
        const id = req.params[idKey]
        const body = req.body.data;
        if (body.id && body.id !== id) {
            next({
                status: 400,
                message: `${objectName} id does not match route id. ${objectName}: ${body.id}, Route: ${id}`
            })
        } else {
            next()
        }
    }
}


module.exports = {
    validateObjectIntegerKeys,
    validateObjectStringKeys,
    validateObjectArrayKeys,
    isIdMatchingWithRouteId
}