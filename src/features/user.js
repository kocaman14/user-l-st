import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
    listAr: [],
    isLoading: false,
    userNumber: 19,
    warning: "",
    startIndex: 0,
    endIndex: 5,
    usersPerPage: 5,
    currentPage: 0, 
  };

// export const fetchUsers = createAsyncThunk(
//   "persons/fetchUsers",
//   async (userNumber) => {
//     try {
//       const response = await fetch(`https://randomuser.me/api?results=${userNumber}`);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log(data);
//       return data.results; 
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// );
export const fetchUsers = createAsyncThunk(
    "persons/fetchUsers",
    (userNumber) => {
      return fetch(`https://randomuser.me/api?results=${userNumber}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {

          return data.results
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          throw error;
        });
    }
  );
  

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    nextPage: (state, action) => {
        const pageIndex = action.payload;
        state.currentPage = pageIndex;
  
        state.startIndex = pageIndex * state.usersPerPage;
        state.endIndex = state.startIndex + state.usersPerPage;
      },



  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
   state.listAr = action.payload




      
      
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.warning = "404";
    });
  },
});
export const{nextPage}=userSlice.actions
export default userSlice.reducer;
