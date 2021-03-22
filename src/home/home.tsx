import React from 'react';
import ReactDOM from 'react-dom';
import { Nav } from '../nav';

export const Home: React.FC = () => {
    return (
        <>
            <Nav />
            <div className={'container'}>
                <h1>Home page</h1>
            </div>
        </>
    );
};
