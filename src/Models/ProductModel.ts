import { Document, Schema, Model, model } from 'mongoose';

export interface IProduct extends Document {
    name: string,
    price: number,
    description: string,
}

export interface IProductModel {
    findAllUserProduct(userId: Schema.Types.ObjectId, callback: Function): void
    findOneUserProduct(userId: Schema.Types.ObjectId, productId: Schema.Types.ObjectId, callback: Function): void
}

export const ProductSchema = new Schema (
    {
        name: {
            type: String,
            required: 'Enter the name'
        },
        price: {
            type: Number,
            required: 'Enter the price'
        },
        description: {
            type: String,
            required: 'Enter the description'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            required: true,
        },
    }
)

ProductSchema.static('findAllUserProduct', (userId: Schema.Types.ObjectId, callback: Function) => {
    Product.find({userId: userId}, callback);
});

ProductSchema.static('findOneUserProduct', (userId: Schema.Types.ObjectId, productId: Schema.Types.ObjectId, callback: Function) => {
    Product.findOne({userId: userId, _id: productId}, callback);
});

export type ProductModel = Model<IProduct> & IProductModel & IProduct;

export const Product: ProductModel = <ProductModel>model<IProduct>('Product', ProductSchema)