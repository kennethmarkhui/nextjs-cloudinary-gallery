import { getAllImages, getImagesByName } from "../../utils/drive";

export default async function handler(req, res) {
  // console.log(req.query);
  const pageSize = 5;

  // GET '/' with nextPageToken
  if (req.query.token && !req.query.search) {
    console.log("not search");
    let result;
    try {
      result = await getAllImages(pageSize, req.query.token);
    } catch (error) {
      res.status(500).json({ message: "Getting nextpages failed!" });
      return;
    }
    return res.status(200).json({ message: "nextPage GET success", result });
  }

  // GET search images
  if (req.query.search) {
    const { search, token } = req.query;
    console.log("search");
    let result;
    try {
      result = await getImagesByName(pageSize, search, token);
    } catch (error) {
      res.status(500).json({ message: "Searching data failed!" });
      return;
    }
    return res.status(200).json({ message: "search GET success", result });
  }

  res.status(200).json({ message: "default GET endpoint" });
}
