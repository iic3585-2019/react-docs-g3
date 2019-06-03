import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import Main from './Main';
import FileUploader from './FileUploader';
import Sidebar from './Sidebar';

export default function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FileUploader disableClick >
          <HashRouter>
            <div className="layout-container">
              <Sidebar {...props} />
              <Main {...props} />
            </div>
          </HashRouter>
        </FileUploader>
      </PersistGate>
    </Provider>
  );
}
