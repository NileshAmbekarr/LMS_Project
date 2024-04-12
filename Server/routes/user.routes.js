import Router from 'express';
import{
    registerUser,
    userLogin,
    logout,
    getUserDetails
} from '../controllers/user.controllers.js'
const router = Router();

// routes for a normal user 
router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/logout', logout);
router.get('/me', isLoggedIn, getUserDetails);
export default router;