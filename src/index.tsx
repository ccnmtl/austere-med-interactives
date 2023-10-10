import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './scss/main.scss';

const domNode = document.querySelector('#react-root');
const root = createRoot(domNode);
root.render(<App />);
