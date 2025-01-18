import { IMoviesRequest, IMoviesResponse, IMoviesResult } from '@App/types/slice/movieSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchNowPlayingData = createAsyncThunk(
  'movie/now_playing',
  async ({page = 1}:IMoviesRequest, { rejectWithValue }) => {
    try {
      const response = await axios.get<IMoviesResponse>('/now_playing',{
        params:{
          page,
          language:'en-US',
        },
      });
      return response.data;
    } catch (error: any) {

      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);
export const fetchPopularData = createAsyncThunk(
  'movie/popular',
  async ({page = 1}:IMoviesRequest, { rejectWithValue }) => {
    try {
      const response = await axios.get<IMoviesResponse>('/popular',{
        params:{
          page,
          language:'en-US',
        },
      });
      return response.data;
    } catch (error: any) {

      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);
export const fetchUpcomingData = createAsyncThunk(
  'movie/upcoming',
  async ({page = 1}:IMoviesRequest, { rejectWithValue }) => {
    try {
      const response = await axios.get<IMoviesResponse>('/upcoming',{
        params:{
          page,
          language:'en-US',
        },
      });
      return response.data;
    } catch (error: any) {

      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);
interface IMovieState {
  nowPlayingData:IMoviesResult[] |null
  nowPlayingPage:number
  nowPlayingTotalPage:number
  popularData:IMoviesResult[] |null
  popularPage:number
  popularTotalPage:number
  upcomingData:IMoviesResult[] |null
  upcomingPage:number
  upcomingTotalPage:number
}

const initialState: IMovieState = {
  nowPlayingData: null,
  nowPlayingPage:1,
  nowPlayingTotalPage:1,
  popularData: null,
  popularPage:1,
  popularTotalPage:1,
  upcomingData: null,
  upcomingPage:1,
  upcomingTotalPage:1,
};
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset:(state)=>{
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingData.fulfilled, (state, action) => {
        state.nowPlayingData = state.nowPlayingData ? [...state.nowPlayingData,...action.payload.results] : action.payload.results;
        state.nowPlayingPage = action.payload.page;
        state.nowPlayingTotalPage = action.payload.total_pages;
      })
      .addCase(fetchPopularData.fulfilled, (state, action) => {
        state.popularData = state.popularData ? [...state.popularData,...action.payload.results] : action.payload.results;
        state.popularPage = action.payload.page;
        state.popularTotalPage = action.payload.total_pages;
      })
      .addCase(fetchUpcomingData.fulfilled, (state, action) => {
        state.upcomingData = state.upcomingData ? [...state.upcomingData,...action.payload.results] : action.payload.results;
        state.upcomingPage = action.payload.page;
        state.upcomingTotalPage = action.payload.total_pages;
      });

  },
});

export default movieSlice.reducer;
export const movieActions = movieSlice.actions;



