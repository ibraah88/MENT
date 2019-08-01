
import { Request, Response } from 'express';
import { Product } from '../Models/ProductModel'

export class ProductController {

    public index = async (req: Request, res: Response): Promise<void> => {
        try {
            await Product.findAllUserProduct(req.body.user._id, (err: Error, product: any) => {
               if (err) {
                   res.json('Product not found.');
                }
                res.json(product);
            });
        } catch (err) {
            console.error(err);
            res.json({error: err.message || err});
        }
    }

    public store = async (req: Request, res: Response): Promise<void> => {
        try {
            let data = Object.assign({}, { userId: req.body.user._id}, req.body);
            const product = await new Product(data).save();
            res.json(product);
        } catch (err) {
            console.error(err);
            res.json({error: err.message || err});
        }
    }

    public details = async (req: Request, res: Response): Promise<void> => {
        try {
            await Product.findOneUserProduct(req.body.user._id, req.params.id, (err: Error, product: any) => {
               if (err) {
                    res.json('Product not found.');
               }
                res.json(product);
            });
        } catch (err) {
            console.error(err);
            res.json({error: err.message || err});
        }
    }

    public edit = async (req: Request, res: Response): Promise<void> => {
       //
    }

    public destroy = async (req: Request, res: Response): Promise<void> => {
        //
    }
}