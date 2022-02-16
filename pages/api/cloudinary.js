import { getFiles } from "../../lib/cloudinary";

export default async function handler(req, res) {
  const maxResults = 20;
  const { search, nextCursor, order } = req.query;

  // GET '/'
  let result;
  try {
    result = await getFiles(maxResults, nextCursor, search, order);
  } catch (error) {
    res.status(500).json({ error: "Getting data failed!" });
    return;
  }
  return res.status(200).json({ message: "default GET endpoint", ...result });
}
