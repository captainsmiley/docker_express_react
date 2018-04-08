import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import styles from './scss/application.scss';
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';



// ========================================

ReactDOM.render(
  <App />,
  //<ShoppingList name="Mark" />,
  document.getElementById('root')
);

if (module.hot) {
 module.hot.accept('./components/App.jsx', () => {
     const NextRootContainer = require('./components/App.jsx');
     ReactDOM.render(<NextRootContainer />, document.getElementById('root'));
   })
 }
