/**
 * product functions for CommerceV3 (CV3)
 *
 * @name cv3categories.js
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
    exports.setCategories = void 0;
    const setCategories = (categories, cv3_options) => {
        log.debug("CV3 API setCategories()", cv3_options);
        // update CV3
        var request_object = {
            data: {
                importCategories: {
                    categories: categories,
                },
            },
        };
        return cv3api.call("categories", request_object, cv3_options);
    };
    exports.setCategories = setCategories;
});
