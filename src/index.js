import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme,ThemeProvider  } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { orange, green } from '@material-ui/core/colors';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import {createStore,applyMiddleware ,compose} from "redux"
import rootReducer from "./Components/Reducers/rootReducer"

 const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
  const store = createStore(rootReducer,  composeEnhancers(
 
    applyMiddleware(thunk)
  ));


const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: green,
    
  },
});


ReactDOM.render( 
  <Provider store={store}>
   <ThemeProvider theme={theme}>
   <BrowserRouter>
      <App/>
   </BrowserRouter>
    </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
