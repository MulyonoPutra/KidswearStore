/* eslint-disable import/extensions */
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
import data from '../../data.js';

const productRouter = express.Router();

productRouter.get(
	'/seed',
	expressAsyncHandler(async (request, response) => {
		// await Product.remove({})
		const createdProducts = await Product.insertMany(data.products);
		response?.send({ createdProducts });
	}),
);

productRouter.get(
	'/',
	expressAsyncHandler(async (request, response) => {
		const products = await Product.find({});
		response?.send({ products });
	}),
);

productRouter.get(
	'/:id',
	expressAsyncHandler(async (request, response) => {
		const product = await Product.findById(request?.params.id);
		if (product) {
			response?.send({ product });
		} else {
			response?.status(404).send({ message: 'Product not found' });
		}
	}),
);

export default productRouter;
