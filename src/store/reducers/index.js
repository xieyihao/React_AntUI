import {combineReducers} from "redux";
import {index} from "../actions/index"
//import {RECEIVE_USER_INFO} from "../actions/SignInActions";

const rootReducer = combineReducers({
  index
  //doctRecommend,
  //teamRecommend,
  //docInfoRecommend,
});

export default rootReducer;
