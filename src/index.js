import hh from "hyperscript-helpers";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

// allows using html tags as functions in javascript
const { input, div, button, p, h1, table, th, td, tr, } = hh(h);

// A combination of Tailwind classes which represent a (more or less nice) button style
const btnStyle = "bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition-colors ring-offset-1 focus:ring-green-700";
const btnStyle2 = "bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors ring-offset-1 focus:ring-red-700";

// Messages which can be used to update the model
const MSGS = {
    UPDATE_MODEL: "UPDATE_MODEL",
    UPDATE_MEAL: "UPDATE_MEAL",
    UPDATE_CALORIES: "UPDATE_CALORIES",
    ADD_MEALS: "ADD_MEALS",
    DELETE_MEALS: "DELETE_MEALS",
    // ... ℹ️ additional messages
};

// View function which represents the UI as HTML-tag functions
function view(dispatch, model) {

    return div({ className: "flex flex-row gap-4 items-center" }, [
        h1({ className: "text-1xl" }, `Meal`),
        input({
            className: "relative w-full min-w-[300px] h-10",
            type: "Text",
            placeholder: "Enter meal name",
            value: model.textField1,
            oninput: (e) => dispatch({ type: MSGS.UPDATE_MEAL, value: e.target.value }),
        }),
        h1({ className: "text-1xl" }, `Calories`),
        input({
            className: "relative w-full min-w-[300px] h-10",
            type: "Text",
            placeholder: "Enter calories number",
            value: model.textField2,
            oninput: (e) => dispatch({ type: MSGS.UPDATE_CALORIES, value: e.target.value }),
        }),
        button({
            className: btnStyle,
            onclick: () => dispatch(MSGS.ADD_MEALS)
        }, "Save"),
        button({
            className: btnStyle2,
            onclick: () => dispatch(MSGS.DELETE_MEALS)
        }, "Cancel"),
        div({ className: "flex flex-row mt-6" }, [
            { id: "table"},
            table({ className: "" }, [
                tr({ className: "" }, [
                    th({ className: "" }, "Meal Name"),
                    th({ className: "" }, "Calories"),
                ]),
                tr([
                    td({ className: "" }, "Total"),
                    td({ className: "" }, totalcalories.toString()),
                ]),
            ]),
        ]),

        /*h1({ className: "text-2xl" }, `My Title`),
        button({ className: btnStyle, onclick: () => dispatch(MSGS.UPDATE_MODEL) }, "Update Model"),
        p({ className: "text-2xl" }, `Time: ${model.currentTime}`),

        button({ className: btnStyle, 
            onclick: () => dispatch(MSGS.UPDATE_RANDOM_NUMBER) }, "Update Random Number"),

        p({ className: "text-2xl" }, `Random Number: ${model.randomNumber}`),*/
        // ... ℹ️ additional elements
    ]);

}

// Update function which takes a message and a model and returns a new/updated model
function update(msg, model) {
    switch (msg) {
        case MSGS.UPDATE_MODEL:
            return { ...model, currentTime: new Date().toLocaleTimeString() };

        case MSGS.UPDATE_MEAL:
            return { ...model, textField1: msg.value() };

        case MSGS.UPDATE_CALORIES:
            return { ...model, textField2: msg.value() };

        case MSGS.ADD_MEALS:
            return { ...model, table: msg.table()};
            
        default:
            return model;
    }
}

function calculateCalories(table) {
    return 
}

// ⚠️ Impure code below (not avoidable but controllable)
function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);
    function dispatch(msg) {
        model = update(msg, model);
        const updatedView = view(dispatch, model);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

// The initial model when the app starts
const initModel = {
    meals: [],
    totalCalories: 0,
};

// The root node of the app (the div with id="app" in index.html)
const rootNode = document.getElementById("app");

// Start the app
app(initModel, update, view, rootNode);