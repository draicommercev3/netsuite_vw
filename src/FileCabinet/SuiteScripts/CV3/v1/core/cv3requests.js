/**
 * catalog request functions for CommerceV3 (CV3)
 *
 * @name cv3requests.js
 * @copyright 2022 CommerceV3, Inc.
 * @author Blake Ellis <blake@commercev3.com>
 *
 * @NApiVersion 2.1
  * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(["require", "exports", "N/log", "./cv3api"], function (require, exports, log, cv3api) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNew = void 0;
    const getNew = (cv3_options) => {
        log.debug("CV3 API", "cat_requets.getNew");
        var request_object = {
            data: {
                exportCatalogRequests: {
                    req_new: true,
                },
            },
        };
        var response_object = cv3api.call("orders", request_object, cv3_options);
        return response_object.exportCatalogRequests.catalog_requests;
    };
    exports.getNew = getNew;
});
