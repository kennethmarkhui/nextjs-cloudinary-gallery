import { getFiles } from "../../../lib/cloudinary";

export default async function (req, res) {
  // console.log(req.query);
  const maxResults = 5;
  const { nextCursor, order } = req.query;

  // GET '/'
  console.log("get all");
  let result;
  try {
    result = await getFiles(maxResults, nextCursor, order);
  } catch (error) {
    res.status(500).json({ error: "Getting data failed!" });
    return;
  }
  return res.status(200).json({ message: "default GET endpoint", ...result });
}
