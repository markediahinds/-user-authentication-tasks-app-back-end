const checkTitle = (req, res, next) => {
    if(!req.body.title) {
        res.status(400).json({ error: 'Title is Required'})
    } else {
        return next()
    }
}


module.exports = { checkTitle }