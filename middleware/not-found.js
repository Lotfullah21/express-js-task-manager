const notFound = (req, res) => res.status(404).send("resource does not exist");

module.exports = notFound;
