import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {PhotoProvider} from './context/PhotoContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <PhotoProvider>
        <App/>
    </PhotoProvider>
);


