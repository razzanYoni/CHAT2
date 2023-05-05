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
        const { id_history, pertanyaan, jawaban } = req.body;
        await prisma.q_A.create({
            data: {
                id_history: Number(id_history),
                pertanyaan: pertanyaan,
                jawaban: jawaban,
            },
        });
        res.status(200).json({ success: true });
    }
    catch (e) {
        res.status(200).json({ success: false });
    }
}
