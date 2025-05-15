import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "sentiment.json");
  try {
    const content = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(content));
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
}
