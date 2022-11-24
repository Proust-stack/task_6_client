import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
  },
  reducers: {
    registryUser(state, action) {
      state.currentUser = action.payload.user;
    },
    setUsers(state, action) {
      state.users = action.payload.users;
    },
  },
});

export const { registryUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
