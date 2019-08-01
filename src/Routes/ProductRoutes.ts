import { Router } from 'express';
import { Auth } from '../Middlewares/Auth';
import { ProductController } from '../Controllers/ProductController';

export class ProductRoutes {

    public router: Router;
    public productController: ProductController = new ProductController();

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    public routes() {
        this.router.get('/', [Auth],this.productController.index);
        this.router.post('/', [Auth], this.productController.store);
        this.router.get('/:id', [Auth], this.productController.details);
        this.router.put('/:id', [Auth], this.productController.edit);
        this.router.delete('/:id', [Auth], this.productController.destroy);
    }
}