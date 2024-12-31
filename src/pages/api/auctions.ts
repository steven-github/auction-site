import { NextApiRequest, NextApiResponse } from "next";

const mockAuctions = [
    { id: "1", title: "Vintage Clock", description: "Antique clock from 1900s", currentBid: 200, endTime: "2024-01-01T12:00:00Z" },
    { id: "2", title: "Rare Painting", description: "Famous artist painting", currentBid: 1000, endTime: "2024-01-02T12:00:00Z" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        res.status(200).json(mockAuctions);
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
