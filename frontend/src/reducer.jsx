const initialState = {
    points: 5000,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_POINTS':
        return {...state, points: action.payload }; 
  
      default:
        return state;
    }
  };
  
  export default reducer;