import React from 'react';
import ReactDOM from 'react-dom';
import { Nav } from '../nav';

export const Medkit: React.FC = () => {
    return (
        <>
            <Nav />
            <div className={'container'}>
                <h1>Medkit sim</h1>
            </div>
        </>
    );
};

