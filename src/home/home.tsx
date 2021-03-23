import React from 'react';
import { Nav } from '../nav';

export const Home: React.FC = () => {
    return (
        <>
            <Nav />
            <div className={'container'} data-testid='home'>
                <h1>Home page</h1>
            </div>
        </>
    );
};
