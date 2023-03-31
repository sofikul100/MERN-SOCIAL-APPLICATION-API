const express = require('express');

const router = express.Router();
const {
    createPost,
    likeAndUnlikePost,
    deletePost
} = require('../controllers/postController')

const checkUserAuth = require('../middlewares/auth-middleware')
router.use('/post/new',checkUserAuth)
router.use('/post/:id',checkUserAuth)
router.use('/post/remove/:id',checkUserAuth)




router.route('/post/new').post(createPost);
router.route('/post/:id').post(likeAndUnlikePost)
router.route('/post/remove/:id').delete(deletePost)




module.exports = router;