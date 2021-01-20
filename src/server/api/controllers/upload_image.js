
exports.uploadImage = async (req, res, next) => {
    const filename = req.fileName;
    if (filename) {
        req.filename = filename;
        next()
    }
    next()
}