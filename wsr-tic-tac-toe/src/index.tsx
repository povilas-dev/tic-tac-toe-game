import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";;
import { App } from './app';
import './reset.st.css';
import { store } from './redux/store';

const container = document.body.appendChild(document.createElement('div'));
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    container
);
