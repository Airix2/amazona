// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../models/index.js');
const Users = db.users;
const Products = db.products;
import data from '../../utils/data'

export default async function (req, res) {
  let answer = await Users.bulkCreate(data.users)
  let answer2 = await Products.bulkCreate(data.products)
  console.log(answer)
  res.send({ message: 'seeded success'})
}