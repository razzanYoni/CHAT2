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
        const { pertanyaan, jawaban } = req.body;
        await prisma.reference.create({
            data: {
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
