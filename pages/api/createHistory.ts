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
    let { judul } = req.body;
    if (!judul) {
        return res.status(200).json({success: false});
    }

    await prisma.history.create({
        data: {
            judul: judul,
        },
    });

    return res.status(200).json({success: true});
}