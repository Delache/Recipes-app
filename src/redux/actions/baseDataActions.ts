export const SET_DATA = "SET_DATA";
export const RESET_DATA = "RESET_DATA";

//Action Creator
export const resetData = () => ({
   type: RESET_DATA
});

export const setData = (data: Object) => ({
    type: SET_DATA,
    data: data
});
