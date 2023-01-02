import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "utils/client";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  if (!!!req.body) return res.status(400).end();

  let { data, error } = await supabase
    .from("claim-form-submissions")
    .insert(JSON.parse(req.body));

  if (!!error) {
    return res.status(403).send({ status: false, message: error.message });
  }

  res.status(200).send({ status: true, data: data?.[0] });
}
