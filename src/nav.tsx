import React, { useState } from 'react';

export const Nav: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    return (<>
        <nav id={'am-nav'}
            className={'navbar navbar-expand-lg navbar-dark bg-dark'}
            data-testid={'nav'}>
            <div className={'container-fluid'}>
                <a className={'navbar-brand'} href={'/'}>
                    <span id={'am-nav__logotype-outer'}>
                        <span id={'am-nav__logotype-inner'}>AUSTERE</span>MEDICINE</span>
                        Outbreak Simulation
                </a>
                <button
                    className={'navbar-toggler'}
                    type='button'
                    onClick={() => setShowDropdown((prev) => !prev)}
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div id='navbarSupportedContent'
                    className={`collapse navbar-collapse${showDropdown ? ' show' : ''}`}>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <a className='nav-link' aria-current='page' href='#'>Introduction</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' aria-current='page' href='#'>Medkit</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' aria-current='page' href='#'>Triage</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className={'container'}>
            <div className='alert alert-danger d-block d-xl-none view-only'
                role='alert' aria-hidden='true'>
            Austere Med Sims are optimized for larger screens. Please
            switch to a desktop computer, or expand your browser size.
            </div>
        </div>
    </>);
};
