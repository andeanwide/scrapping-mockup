import { userProps } from '@/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface uniquePayloadString {
  payload: string;
}

interface webSlice {
  module: string;
  reloadModule: EpochTimeStamp | string;
  userDetails: userProps | undefined;
  isOpenThemeMenu: boolean;
}

// Define the initial state using that type
const initialState: webSlice = {
  module: 'Transferencia',
  reloadModule: '',
  userDetails: undefined,
  isOpenThemeMenu: false,
};

export const webSlice = createSlice({
  name: 'web',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setModuleName: (state, action: uniquePayloadString) => {
      state.module = action.payload;
    },
    setReloadModule: (state) => {
      state.reloadModule = Date.now();
    },
    setUserDetails: (state, action: PayloadAction<userProps>) => {
      state.module = 'Detalles del usuario';
      state.userDetails = action.payload;
    },
    onShowHideThemeSidebar: (state, { payload }) => {
      state.isOpenThemeMenu = payload;
    },
    resetWeb: () => initialState,
  },
});

export const { setModuleName, setReloadModule, setUserDetails, onShowHideThemeSidebar, resetWeb } =
  webSlice.actions;
