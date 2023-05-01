import prisma from 'db';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    success: boolean;
    info?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const { id_history, judul } = req.body;

        await prisma.history.update({
            where: {
                id_history: Number(id_history),
            },
            data: {
                judul: judul,
            },
        });

        res.status(200).json({ success: true });
    }
    catch (e) {
        res.status(200).json({ success: false });
    }
}