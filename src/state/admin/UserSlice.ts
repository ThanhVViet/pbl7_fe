import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "sonner";
import {api} from "../../config/Api";
import {User} from "../../types/UserType";



export const fetchAllUser = createAsyncThunk<any, any>('/user/fetchAllUser',
    async (jwt, {rejectWithValue}) => {
        try {

            const res = await api.get('/identity/users', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log('get all user', res.data)
            return res.data.result;

        } catch (e) {
            console.log('error get all user', e)
        }
    })

export const disableUser = createAsyncThunk(
  "user/disableUser",
  async ({ userId, jwt }: { userId: string, jwt: string }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/identity/users/${userId}/disable`, null, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Lỗi khi disable user");
    }
  }
);

export const enableUser = createAsyncThunk(
  "user/enableUser",
  async ({ userId, jwt }: { userId: string, jwt: string }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/identity/users/${userId}/enable`, null, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Lỗi khi enable user");
    }
  }
);

interface AuthState {

    users: User[] | null
    loading: boolean
    roles: string[]
}

const initialState: AuthState = {
    users: [],
    loading: false,
    roles: []
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUser.pending, (state, action) =>{
            state.loading = true
            state.users = null
        })
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        builder.addCase(fetchAllUser.rejected, (state, action) => {
            state.loading = false
            state.users = null
        })
    }

})


export default userSlice.reducer