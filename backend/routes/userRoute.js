const router = require('express').Router();

const {registerUser,loginUser,loggedUser,changePassword,followUser,getPostOfFollowing} = require('../controllers/userController');


const checkUserAuth = require('../middlewares/auth-middleware')
router.use('/me',checkUserAuth)
router.use('/password/change',checkUserAuth)
router.use('/follow/:id',checkUserAuth)
router.use('/posts',checkUserAuth)





router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/me').get(loggedUser)

router.route('/password/change').put(changePassword)

router.route('/follow/:id').post(followUser)

router.route('/posts').get(getPostOfFollowing);


module.exports = router;