import { getAllImages, getImagesByName } from "../../../lib/gdrive";

export default async function handler(req, res) {
  // console.log(req.query);
  const pageSize = 5;
  const { nextPageToken, order } = req.query;

  // GET '/'
  console.log("get all");
  let result;
  try {
    result = await getAllImages(pageSize, nextPageToken, order);
  } catch (error) {
    res.status(500).json({ error: "Getting data failed!" });
    return;
  }
  return res.status(200).json({ message: "default GET endpoint", result });
}
