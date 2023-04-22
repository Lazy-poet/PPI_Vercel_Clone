import { start } from "@/libs/bugsnag";
import Bugsnag from "@bugsnag/js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "utils/client";

start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (!!!req.body) return res.status(400).end();

    let { data, error } = await supabase
      .from("PPI_Claim_Form")
      .insert(JSON.parse(req.body));

    if (!!error) {
      Bugsnag.notify(
        new Error(error.message, {
          cause: error,
        }),
        function (event) {
          event.severity = "error";
          event.context = "calling-claim-form-api-PPI_Claim_Form";
          event.addMetadata("request", req);
        }
      );
      return res.status(403).send({ status: false, message: error.message });
    }

    res.status(200).send({ status: true, data: data?.[0] });
  } catch (e: any) {
    Bugsnag.notify(e, function (event) {
      event.severity = "error";
      event.context = "calling-claim-form-api";
      event.addMetadata("request", req);
    });
    res.status(500).json(
      JSON.stringify({
        error: e.message,
      })
    );
  }
}
