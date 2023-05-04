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
        const { id_reference } = req.query;

        await prisma.reference.delete({
            where : {
                id_reference: Number(id_reference),
            }
        });
        res.status(200).json({ success: true });
    } catch (e) {
        res.status(200).json({ success: false });
    }
}
