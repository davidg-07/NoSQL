const { user, User } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // get a user
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
    // create a user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(500).json(err));
    },
    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(500).json(err));
    },
    // add a friend
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },
    //   remove a friend
    removeFriend({ params }, res) {
        console.log("remove friend", params.friendId);
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
        )
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.json(err));
      },
    };