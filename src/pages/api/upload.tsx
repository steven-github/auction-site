import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false, // Disable body parsing for formidable
    },
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const form = new formidable.IncomingForm();
        const uploadDir = path.join(process.cwd(), "/public/uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        form.uploadDir = uploadDir;
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: "Failed to upload image" });
            }
            const filePath = `/uploads/${path.basename(files.image.filepath)}`;
            return res.status(200).json({ path: filePath });
        });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
