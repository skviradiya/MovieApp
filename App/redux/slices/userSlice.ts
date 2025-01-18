import { IUserDetails } from '@App/types/firebase';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IUserState{
  userDetails:IUserDetails|null
}
const initialState: IUserState = {
  userDetails:null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails:(state,action:PayloadAction<IUserDetails>)=>{
      state.userDetails = action.payload;
    },
  },
  extraReducers: () => {
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
