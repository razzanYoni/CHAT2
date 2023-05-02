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
        const { id_history } = req.query;
        const history = await prisma.history.findUnique({
            where: {
                id_history: Number(id_history),
            },
        });
        res.status(200).json({ success: true, data: history });
    } catch (e) {
        res.status(200).json({ success: false });
    }
}
