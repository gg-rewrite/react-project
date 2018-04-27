import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer.js";
import userReducer  from "./userReducer.js";
import videoReducer from "./videoReducer.js";
import playlistReducer from "./playlistReducer.js";

const reducer = combineReducers({
    categories: categoryReducer,
    user: userReducer,
    videos: videoReducer,
    playlists: playlistReducer
});

export default reducer;
