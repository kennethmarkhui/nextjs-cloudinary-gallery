import { getImages, getImage } from "../../utils/drive";

export default async function handler(req, res) {
  console.log(req.query);
  const pageSize = 5;

  // POST
  if (req.method === "POST") {
    const token = req.body;
    const result = await getImages(pageSize, token);
    return res.status(200).json({ message: "POST success", result });
  }

  // GET search images
  if (req.query.search) {
    const { search } = req.query;
    const result = await getImage(pageSize, search);
    return res.status(200).json({ message: "search GET success", result });
  }

  res.status(200).json({ message: "default GET endpoint" });
}
