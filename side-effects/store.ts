import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from "@reduxjs/toolkit";
import managerReducer from "./manager/reducer";
import { SnackBarReducer } from "./snackbarRedux";
import dashboardCallReducer from "./dashboard/reducer";

const reducers = combineReducers({
  snackbarRedux: SnackBarReducer,
  manager: managerReducer,
  dashboardCalls: dashboardCallReducer,
});

export const store = configureStore({
  reducer: reducers,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
