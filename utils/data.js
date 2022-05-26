import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: 'true',

        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: 'true',

        },
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/shirt2.jpg',
            price: 100,
            brand: 'Addidas',
            rating: 4.2,
            numReviews: 10,
            countInStock: 20,
            description: 'A fit shirt',
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: '/images/shirt3.jpg',
            price: 70,
            brand: 'Neon',
            rating: 3.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A slim shirt',
        },
        {
            name: 'Gold Pants',
            slug: 'gold-pants',
            category: 'Pants',
            image: '/images/pants1.jpg',
            price: 30,
            brand: 'Nike',
            rating: 4.7,
            numReviews: 10,
            countInStock: 20,
            description: 'Smart pants',
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',
            image: '/images/pants2.jpg',
            price: 95,
            brand: 'Zara',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular pant',
        },
    ]
}

export default data;