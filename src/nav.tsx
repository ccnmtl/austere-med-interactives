import React from 'react';
import {Link} from 'react-router-dom';

export const Nav: React.FC = () => (
    <>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark' data-testid='nav'>
            <Link className='navbar-brand' to='/'>
                Austere Med Sim
            </Link>
            <div className='navbar-nav-scroll'>
                <ul className='navbar-nav bd-navbar-nav flex-row'>
                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>
                        &larr; Back to the home page
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div className={'container'}>
            <div className='alert alert-danger d-block d-xl-none view-only'
                role='alert' aria-hidden='true'>
            Austere Med Sims are optimized for larger screens. Please
            switch to a desktop computer, or expand your browser size.
            </div>
        </div>
    </>
);

