import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  permissions: string[];
  lang: string;
  count: number
}

const initialState: CounterState = {
  permissions: [],
  lang: '',
  count: 0
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    getPermissions: (state, action) => ({
      ...state,
      permissions: action.payload
    }),
    getLang: (state, action) => ({
      ...state,
      lang: action.payload
    }),
    count: (state) => ({
      ...state,
      count: state.count + 1
    })
  }
});

// Action creators are generated for each case reducer function
export const { getPermissions, getLang, count } = commonSlice.actions;

export default commonSlice.reducer;
