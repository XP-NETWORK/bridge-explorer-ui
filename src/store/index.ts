import { configureStore } from "@reduxjs/toolkit";
import globalSlice, {Global} from './global'


export interface ReduxState {
    global: Global
}


export default configureStore({
  reducer: {
    global: globalSlice
  },

});