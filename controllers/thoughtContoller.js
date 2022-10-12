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
    // update thought
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
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $push: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json({message: 'Thought deleted!'});
        })
        .catch((err) => res.status(500).json(err));
    },
    //   add reaction
      addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
    // remove reaction
    removeReaction(req, res) {
        thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
          { runValidators: true, new: true }
        )
          .then((student) =>
            !student
              ? res
                  .status(404)
                  .json({ message: 'No student found with that ID :(' })
              : res.json(student)
          )
          .catch((err) => res.status(500).json(err));
      },
};