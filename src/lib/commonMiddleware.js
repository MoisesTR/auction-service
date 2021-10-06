import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";

/**
 * [httpJsonBodyParser] Will automatically parse the stringify body received on the handler.
 *
 * [httpEventNormalizer] Will automatically adjust the API gateway event objects to prevent us from accidentally having non existent object
 * when trying to access to path parameters or query parameters and they are not provided, just will save us from room for errors.
 * Reduces room for errors, buy also reduces the amount of if statements that we need.
 *
 * [httpErrorHandler] Can help us make our handling error process smooth , easy and clean by working with the http-errors package.
 */
export default (handler) =>
  middy(handler).use([
    httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
    cors()
  ]);
