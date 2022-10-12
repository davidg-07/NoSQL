const { user, User } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
        .select('-__v')
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
}