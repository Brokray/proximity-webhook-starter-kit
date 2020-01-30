import { failResponse, handleErrorsExpress, successResponse } from "./lib/utils";
import { getWebhookAnswer } from "./provider/webhookProvider";

async function qwantHandler(request) {
  const { body: { intent: { inputs = {}, name = "" } = {}, fulfillment = {}, query = '' } = {} } = request;

  if (!name) {
    // If the name of intent found by the NLU is empty, we can for example, return the fulfillment defined by the bot admin in Proximity
    // This is only an example to show how to use fulfillment, as an undefined name should never happen.
    return failResponse(fulfillment);
  }

  // We call a function which will do all the work and return the well formatted answer
  const webhookAnswer = await getWebhookAnswer({ inputs, query, fulfillment });

  return successResponse(webhookAnswer);
}

export default {
  qwant: handleErrorsExpress(qwantHandler),
};
