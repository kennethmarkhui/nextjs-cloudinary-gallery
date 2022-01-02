import {
  getImages,
  // getImage
} from "../../utils/drive";

export default async function handler(req, res) {
  const pageSize = 1;
  // POST
  if (req.method === "POST") {
    const token = req.body;
    const result = await getImages(pageSize, token);
    return res.status(200).json({ message: "POST success", result });
  }

  // GET search images
  // const result = await getImage(pageSize, undefined, "1");

  res.status(200).json({ message: "GET api" });
}
