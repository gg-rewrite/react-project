import store from "./store/store.js";
import * as categoryActions from "./actions/categories.js";

store.subscribe(() => console.log("Aand action!"));

console.log("Initial store");
console.log(store.getState());

store.dispatch(categoryActions.listCategories());

setTimeout(() => {
    console.log("New state:");
    console.log(store.getState());
}, 2000);
