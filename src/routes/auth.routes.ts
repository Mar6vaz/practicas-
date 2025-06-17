import { Router } from "express";
import { login, getTime, updateTime, getAllUsers, getUserByUsername, createUser,encryptPassword,} from "../controllers/auth.controller"; 
import { createOrder } from "../controllers/order.controller";


const router = Router();

router.post('/login-user', login); //ruta del control
router.get('/getTime/:userId', getTime);
router.put('/updateTime', updateTime);
router.get('/users', getAllUsers);
router.get('/user/:username', getUserByUsername);
router.post('/users',createUser);
router.put('/encrypt-password', encryptPassword);
router.post('/create-order', createOrder);



export default router;