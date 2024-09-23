"use strict";
/**
 * import new orders from CV3 web store
 *
 * @name cv3_import_orders.js
 * @copyright 2022 CommerceV3, Inc.
 * @author Blake Ellis <blake@commercev3.com>
 *
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * @NAmdConfig /SuiteScripts/CV3/configuration.json
 */
// This is a NetSuite "MapReduce" SuiteScript. That's a fancy way of saying
// this script needs to take a list of things and do the same thing to each
// thing in the list. In this case, it's going to take a list of Sales Orders
// that need payment information and add that payment information.
//
// Step 1 ~ get a list of Sales Orders and get the payment data from CV3.
// Step 2 ~ for each Sales Order, add the payment data.
//
// Step 1 happens below in the getInputData() function. NetSuite will call this
// function automatically, and when it completes it will return a list (an array)
// of CV3 order objects. NetSuite will send each CV3 order object in this array
// to the map() function. The "context" object sent to this function IS an 
// an individual CV3 order.
//
// Step 2 happens in the map() function. It edits an individual sales order
// to add the payment info and saves it.
//
// That's it. We may add some error reporting, but this script will be scheduled
// to run over and over again, so if any particular order fails it will just try
// again the next time.
define(["N/search", "cv3core", "cv3client"], (search, cv3, cv3client) => {
    // getInputData() is "step 1" of this script. It
    // 
    // 1. searches NetSuite for Sales Orders that need payment info
    // 2. uses the search results to assemble a list of web order ids needed
    // 3. hits CV3 to get order data for the list of web order ids
    // 4. RETURNS an array of order data
    const getInputData = () => {
        // set our cv3 custom options
        const cv3_options = cv3client.getCV3Options();
        log.debug({title: "cv3_ordr",details: JSON.stringify(cv3_ordr),});       
        log.debug({title: "cv3_options",details: JSON.stringify(cv3_options),});       


        // 1. search NetSuite for Sales Orders that need payment info
        let cv3_order_numbers = [];
        // 2. uses the search results to assemble a list of web order ids needed
        cv3_order_numbers.push("8"); // test store
        try {
            // 3. hits CV3 to get order data for the list of web order ids
            var orderData = cv3.orders.get(cv3_order_numbers, cv3_options);
            log.debug({title: "orderData",details: JSON.stringify(orderData),});       
            // 4. RETURNS an array of order data
            return orderData;
        }
        catch (e) {
            log.error({
                title: "CV3 Order Import Error",
                details: "Error: " + e.message + "\nStack: " + e.stack,
            });
        }
    };
    // map() is "step 2" of this script. It runs once for every CV3 order
    // that is sent to it in the return of getInputData() above.
    const map = (context) => {
        var order = JSON.parse(context.value);
        // update sales order
        log.debug("import_orders map()", "updating sales order for web order ID" + order.order_id);
        context.write({
            key: "success",
            value: order.order_id,
        });
    };
    // invoked one time at end
    const summarize = (context) => {
        // Log details about the script's execution.
        var successfulOrders = [];
        context.output.iterator().each(function (key, value) {
            successfulOrders.push(value);
            return true;
        });
        log.debug({
            title: "Successful Order IDs",
            details: JSON.stringify(successfulOrders),
        });
    };
    return { getInputData, map, summarize };
});
