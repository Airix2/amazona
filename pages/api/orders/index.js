// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../../models/index.js');
const Orders = db.orders;
import {isAuth} from '../../../utils/auth'

export default async function (req, res) {
  const { method, body, query: { id } } = req;
  let answer = await isAuth(req, res);
  if (answer !== 1) {
    console.log(answer)
    return res.status(401).json({ message: answer });
  }

  switch (method) {
    case "POST":
      try {
        //console.log(body, req.user)
        //res.status(201).json({answer: 1})
        let newOrder = await Orders.create({
          ...body,
          user: req.user.id
        });
        res.status(201).json(newOrder)
      } catch (err) {
          console.log({ message: err.message })
          return res.status(400).json({ message: err.message });
      }
      return
    default:
        return res.status(400).json({ message: "Method are not supported" });
  }
}