/**
 * Module of API functions for CommerceV3 (CV3)
 *
 * @name cv3api.js
 * @copyright 2022 CommerceV3, Inc.
 * @author Blake Ellis <blake@commercev3.com>
 *
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(["require", "exports", "N/encode", "N/https"], function (require, exports, encode, https) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.call = void 0;
    // auth takes a scope (orders, products, etc.) and returns an OAuth2
    // token for use with the API endpoints.
    function auth(scope, cv3_options) {
        var data = "grant_type=client_credentials&scope=" + scope;
        var header = {};
        header["Content-Type"] = "application/x-www-form-urlencoded";
        var auth_string = cv3_options.api_key + ":" + cv3_options.api_secret;
        var auth_token = encode.convert({
            string: auth_string,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_64,
        });
        header["Authorization"] = "Basic " + auth_token;
        var cv3response = https.post({
            url: cv3_options.endpoint_auth,
            body: data,
            headers: header,
        });
        var response_object = JSON.parse(cv3response["body"]);
        return response_object.access_token;
    }
    function call(endpoint, request, cv3_options) {
        // auth
        var access_token = auth(endpoint, cv3_options);
        var header = {};
        header["Content-Type"] = "application/json";
        header["Authorization"] = "Bearer " + access_token;
        // SEND THE REQUEST
        var cv3response = https.post({
            url: cv3_options.api_url + endpoint,
            body: JSON.stringify(request),
            headers: header,
        });
        return JSON.parse(cv3response["body"]);
    }
    exports.call = call;
});
