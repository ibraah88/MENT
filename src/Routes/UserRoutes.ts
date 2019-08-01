import { Router } from 'express';
import { Auth } from '../Middlewares/Auth';
import { UserController } from '../Controllers/UserController';

export class UserRoutes {

    public router: Router;
    public userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    public routes() {
        this.router.post('/register', this.userController.register);
        this.router.post('/login', this.userController.login);
        this.router.get('/profile', [Auth], this.userController.profile);
        this.router.put('/profile', [Auth], this.userController.edit);
    }
}