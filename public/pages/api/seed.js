import nc from 'next-connect';
// import Product from '../../models/Product';
import db from '../../utils/dbConnect';
import data from '../../utils/data';
import User from '../../models/User';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  await db.disconnect();
  // res.send({ message: 'seeded successfully' });
  return res.send({ message: 'already seeded' });
});

export default handler;
