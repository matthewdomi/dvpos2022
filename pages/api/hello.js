import db from '../../utils/dbConnect';

export default async function handler(req, res) {
  await db.connect();
  await db.disconnect();
  res.status(200).json({ name: 'John Doe' });
}
