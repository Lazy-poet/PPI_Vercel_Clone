import { start } from "@/libs/bugsnag";
import Bugsnag from "@bugsnag/js";
import ip from "ip";
import type { NextApiRequest, NextApiResponse } from "next";

start();

export default function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  try {
    let userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (userIp) {
      if (typeof userIp === "string") {
        userIp = userIp.split(",")[0].trim();
      } else {
        if (Array.isArray(userIp)) {
          userIp = userIp[0];
        }
      }
      if (!ip.isV6Format(userIp)) {
        userIp = "N/A";
      }
    }
    res.json({ userIp });
  } catch (e: any) {
    Bugsnag.notify(e, function (event) {
      event.severity = "error";
      event.context = "calling-ip-api";
      event.addMetadata("request", req);
    });
    res.status(500).json(
      JSON.stringify({
        error: e.message,
      })
    );
  }
}
