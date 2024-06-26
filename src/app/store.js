import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { todosReducer } from '../features/todos/todosSlice';
import { authReducer } from '../features/auth/authSlice';
import { dialogsReducer } from '../features/misc/dialogs';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    todos: todosReducer,
    dialogs: dialogsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
