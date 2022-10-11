const { Thought, User } = require('../models/Thought');

module.exports = {
    // get all thoughts
    getThought(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // get thoughts by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .select('-__v')
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
}