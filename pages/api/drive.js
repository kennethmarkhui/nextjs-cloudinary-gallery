import { getAllImages, getImagesByName } from "../../utils/drive";

export default async function handler(req, res) {
  // console.log(req.query);
  const pageSize = 5;
  const { search, token, order } = req.query;

  // GET '/'
  if (!req.query.search && !req.query.token) {
    console.log("get all");
    let result;
    try {
      result = await getAllImages(pageSize, undefined, order);
    } catch (error) {
      res.status(500).json({ error: "Getting data failed!" });
      return;
    }
    return res.status(200).json({ message: "default GET endpoint", result });
  }

  // GET search images
  if (req.query.search && !req.query.token) {
    console.log("search");
    let result;
    try {
      result = await getImagesByName(pageSize, undefined, search, order);
    } catch (error) {
      res.status(500).json({ error: "Searching data failed!" });
      return;
    }
    return res.status(200).json({ message: "search GET success", result });
  }

  // GET with token to load more
  if (
    (req.query.token && req.query.search) ||
    (req.query.token && !req.query.search)
  ) {
    console.log("load-more");
    let result;
    try {
      if (req.query.token && !req.query.search) {
        result = await getAllImages(pageSize, token, order);
      }
      if (req.query.token && req.query.search) {
        result = await getImagesByName(pageSize, token, search, order);
      }
    } catch (error) {
      res.status(500).json({ error: "Getting nextpages failed!" });
      return;
    }
    return res.status(200).json({ message: "load-more GET success", result });
  }
}
