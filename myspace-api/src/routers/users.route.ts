import express  from 'express'; 
import { userController } from '../controllers/user.controller';
const router = express.Router(); 

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router
 