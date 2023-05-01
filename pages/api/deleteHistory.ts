import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    success: boolean;
    info?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const { id_history } = req.query;
        await prisma.q_A.deleteMany({
            where: {
                id_history: Number(id_history),
            },
        });

        await prisma.history.delete({
            where: {
                id_history: Number(id_history),
            },
        });
        res.status(200).json({ success: true });
    } catch (e) {
        res.status(200).json({ success: false });
    }
}
