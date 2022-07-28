/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */

import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import axios from 'axios';
import { fileURLToPath } from 'url';
import multer from 'multer';
import path, { dirname } from 'path';
import userRouter from './src/router/user.router.js';
import productRouter from './src/router/product.router.js';
import orderRouter from './src/router/order.router.js';
import fileConfig from './src/utils/file.config.js';

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

const port = process.env.PORT || 5000;
const url = process.env.ENVIRONMENT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
	multer({
		storage: fileConfig.fileStorage,
		fileFilter: fileConfig.fileFilter,
	}).single('image'),
);

mongoose.connect(url)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	})
	.catch((err) => console.log(err));

app.use('/v1/user', userRouter);
app.use('/v1/product', productRouter);
app.use('/v1/orders', orderRouter);
app.get('/v1/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use((error, request, response) => {
	response?.status(500).send({ message: error?.message });
});

app.use('/v1/test', (req, res) => {
	axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3a1daf644fcfb442c6fc242d0f1915ab&language=en-US&page=1')
		.then((resp) => {
			res.send(resp.data);
		}).catch((err) => {
			console.log(err);
		});
});
