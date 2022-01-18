import { getFilesByName } from "../../../lib/cloudinary";

export default async function handler(req, res) {
  // console.log(req.query);
  const pageSize = 5;
  const { q, nextCursor, order } = req.query;

  console.log("search");

  let result;
  try {
    result = await getFilesByName(pageSize, nextCursor, q, order);
  } catch (error) {
    res.status(500).json({ error: "Searching data failed!" });
  }
  return res.status(200).json({ message: "search GET success", ...result });
}
