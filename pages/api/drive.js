import { listFiles } from "../../utils/drive";

export default async function handler(req, res) {
  // POST
  if (req.method === "POST") {
    const token = req.body;
    const result = await listFiles(100, token);
    return res.status(200).json({ message: "POST success", result });
  }

  // GET
  // const result = await listFiles(10);

  res.status(200).json({ message: "GET api" });
}
