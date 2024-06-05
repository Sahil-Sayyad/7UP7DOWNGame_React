import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import theme from './theme'
import Game from './Game';
import reducer from './reducer';

const store = configureStore({
  reducer: reducer
});
// Here Component App() uses react-router , react-redux and material UI.
function App() {

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Game />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>

    </>
  )
}

export default App
