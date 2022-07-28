import bcrypt from 'bcryptjs';

const data = {
	users: [
		{
			name: 'moels',
			email: 'moel@example.com',
			password: bcrypt.hashSync('1234', 8),
			isAdmin: true,
		},
		{
			name: 'vinas',
			email: 'vina@example.com',
			password: bcrypt.hashSync('1234', 8),
			isAdmin: false,
		},
	],
	products: [
		{
			name: 'Nike Slim Shirt 1',
			category: 'Shirt',
			image:
				'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: '120000',
			countInStock: 20,
			brand: 'Nike',
			rating: 5,
			numReviews: 10,
			description: 'High Quality Shirt',
			size: [ 'S', 'M', 'L', 'XL', 'XXL' ],
		},
		{
			name: 'Nike Slim Shirt 2',
			category: 'Shirt',
			image:
				'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: '120000',
			countInStock: 20,
			brand: 'Nike',
			rating: 5,
			numReviews: 10,
			description: 'High Quality Shirt',
			size: [ 'S', 'M', 'L', 'XL', 'XXL' ],
		},
		{
			name: 'Nike Slim Shirt 3',
			category: 'Shirt',
			image:
				'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: '120000',
			countInStock: 20,
			brand: 'Nike',
			rating: 5,
			numReviews: 10,
			description: 'High Quality Shirt',
			size: [ 'S', 'M', 'L', 'XL', 'XXL' ],
		},
		{
			name: 'Nike Slim Shirt 4',
			category: 'Shirt',
			image:
				'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: '120000',
			countInStock: 20,
			brand: 'Nike',
			rating: 5,
			numReviews: 10,
			description: 'High Quality Shirt',
			size: [ 'S', 'M', 'L', 'XL', 'XXL' ],
		},
		// More products...
	],
};

export default data;
