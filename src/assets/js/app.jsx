import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const render = function render(Component, docName) {
  const container = document.getElementById(docName);
  ReactDOM.render(
    <AppContainer>
      <Component {...container.dataset} />
    </AppContainer>,
    container,
  );
};

try {
  render(App, 'react-app');
  if (module.hot) {
    module.hot.accept('./router', () => { render(App); });
  }
} catch (e) {
  // console.log(e);
}
