/**
 * Module of API & data conversion functions for CommerceV3 (CV3)
 *
 * @name cv3_options.js
 * @copyright 2022 CommerceV3, Inc.
 * @author Blake Ellis <blake@commercev3.com>
 *
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(["require", "exports", "./credentials"], function (require, exports, credentials_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCV3Options = void 0;
    // client-specific stuff for accessing the CV3 API
    const api_url = "https://service.commercev3.com/rest/";
    const endpoint_auth = api_url + "oauth2/token";
    const api_key = credentials_1.cv3credentials.apiKey;
    const api_secret = credentials_1.cv3credentials.apiSecret;
    const orders = [];
    const getCV3Options = () => {
        return {
            api_url,
            endpoint_auth,
            api_key,
            api_secret,
            orders
        };
    };
    exports.getCV3Options = getCV3Options;
});
