import { listFiles } from "../../utils/drive";

export default async function handler(req, res) {
  const token = req.body;

  const result = await listFiles(10, token);
  res.status(200).json({ message: "works", result });
}
