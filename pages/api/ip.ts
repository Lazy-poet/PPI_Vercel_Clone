import ip from 'ip'
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>
) {
    let userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (userIp) {
        if (typeof userIp === 'string') {
            userIp = userIp.split(',')[0].trim();
        } else {
            if (Array.isArray(userIp)) {
                userIp = userIp[0];
            }
        }
        if (!ip.isV6Format(userIp)) {
            userIp = 'N/A';
        }
    }
    res.json({ userIp });
}
