import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import RedditApi from "lib/reddit/redditApi";

export const updateAppToken = createAsyncThunk(
    "auth/updateAppToken",
    async () => {
        return await RedditApi.getAppToken();
    }
);

const initialState: {
    appToken: string | null;
    userToken: string | null;
} = {
    appToken: null,
    userToken: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUserToken: (state, action: PayloadAction<string>) => {
            state.userToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateAppToken.fulfilled, (state, action) => {
            state.appToken = action.payload.access_token;
        });
    },
});

export const selectAppToken = (state: RootState) => state.auth.appToken;
export const selectUserToken = (state: RootState) => state.auth.userToken;
export const selectAccessToken = (state: RootState) => {
    const appToken = selectAppToken(state);
    const userToken = selectUserToken(state);
    return userToken ? userToken : appToken;
};

export const { setUserToken } = authSlice.actions;
export default authSlice.reducer;
