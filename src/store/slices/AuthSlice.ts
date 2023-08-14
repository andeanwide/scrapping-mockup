import { user as userType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type status = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthSlice {
  status: status;
  user: userType | undefined;
}

// Define the initial state using that type
const initialState: AuthSlice = {
  status: 'unauthenticated',
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    authentication: (state, action: { payload: status }) => {
      state.status = action.payload;
    },
    login: (state, action: PayloadAction<userType>) => {
      state.status = 'authenticated';
      state.user = action.payload;
    },
    setLoading: (state) => {
      state.status = 'checking';
    },
    user: (state, action: PayloadAction<userType>) => {
      state.user = action.payload;
    },
    reset: () => initialState,
  },
});

export const { authentication, user, reset, login, setLoading } = authSlice.actions;
