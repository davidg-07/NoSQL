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
    // create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            }).then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'No user found with this id!',
                    })
                    : res.json('Thought added!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deletethought(req, res) {
        thought.findOneAndDelete({ _id: req.params.id })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No course with that ID' })
              : Student.deleteMany({ _id: { $in: course.students } })
          )
          .then(() => res.json({ message: 'thought deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
}