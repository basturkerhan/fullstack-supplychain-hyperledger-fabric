
exports.success = (res, message="Succeeded", data={}) => {
    
    return res.status(200).json({
        message,
        data
    })
}

exports.badRequest = (res, message="Bad Request", data={}) => {
    return res.status(400).json({
        message
    })
}