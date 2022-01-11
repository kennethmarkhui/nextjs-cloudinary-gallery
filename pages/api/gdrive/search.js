import { getImagesByName } from "../../../lib/gdrive";

export default async function handler(req, res) {
  // console.log(req.query);
  const pageSize = 5;
  const { q, nextPageToken, order } = req.query;

  console.log("search");

  let result;
  try {
    result = await getImagesByName(pageSize, nextPageToken, q, order);
  } catch (error) {
    res.status(500).json({ error: "Searching data failed!" });
  }
  return res.status(200).json({ message: "search GET success", result });
}
