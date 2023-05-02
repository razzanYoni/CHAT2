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
        const histories = await prisma.history.findMany({});
        res.status(200).json({ success: true, data: histories });
    } catch (e) {
        res.status(200).json({ success: false });
    }
}
