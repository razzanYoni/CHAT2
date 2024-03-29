import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    success: boolean;
    data?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const references = await prisma.reference.findMany({});
        res.status(200).json({ success: true, data: references });
    } catch (e) {
        res.status(200).json({ success: false });
    }
}
