const router = require('express').router();

const {
    getThought,
    getSingleThought,
    createThought,
    addThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtContoller');