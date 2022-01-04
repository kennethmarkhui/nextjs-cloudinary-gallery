import { getAllImages, getImagesByName } from "../../utils/drive";

export default async function handler(req, res) {
  // console.log(req.query);
  const pageSize = 5;

  // GET '/' with nextPageToken
  if (req.query.token && !req.query.search) {
    console.log("not search");
    const result = await getAllImages(pageSize, req.query.token);
    return res.status(200).json({ message: "POST success", result });
  }

  // GET search images
  if (req.query.search) {
    const { search, token } = req.query;
    console.log("search");
    const result = await getImagesByName(pageSize, search, token);
    return res.status(200).json({ message: "search GET success", result });
  }

  res.status(200).json({ message: "default GET endpoint" });
}
