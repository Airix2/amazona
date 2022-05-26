// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../../models/index.js');
const Products = db.products;

export default async function (req, res) {
  const { method, body, query: { id } } = req;

  switch (method) {
    case "GET":
      try {
        let products = await Products.findAll();
        res.json(products)
      } catch (err) {
          console.log({ message: err.message })
          return res.status(400).json({ message: err.message });
      }
      break;
    case "POST":
      return
    default:
        return res.status(400).json({ message: "Method are not supported" });
  }
}