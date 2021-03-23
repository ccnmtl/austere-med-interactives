import React from 'react';
import { Nav } from '../nav';

export const Medkit: React.FC = () => {
    return (
        <>
            <Nav />
            <div className={'container'} data-testid='medkit'>
                <h1>Medkit sim</h1>
            </div>
        </>
    );
};

