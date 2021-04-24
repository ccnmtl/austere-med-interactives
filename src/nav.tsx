import React, { useState } from 'react';

interface NavItems {
    text: string;
    active: boolean;
    link: string;
}

interface NavProps {
    title: string;
    items: NavItems[];
}

export const Nav: React.FC<NavProps> = ({title, items}: NavProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    return (<>
        <nav id={'am-nav'}
            className={'navbar navbar-expand-lg navbar-dark bg-dark'}
            data-testid={'nav'}>
            <div className={'container-fluid'}>
                <a className={'navbar-brand'} href={'/'}>
                    <span id={'am-nav__logotype-outer'}>
                        <span id={'am-nav__logotype-inner'}>AUSTERE</span>MEDICINE</span>&nbsp;
                    {title}
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
                        {items.map((el, idx) => {
                            return (
                                <li key={idx} className='nav-item'>
                                    <a className={'nav-link ' + (el.active ? 'active' : '')}
                                        aria-current='page' href={el.link}>
                                        {el.text}
                                    </a>
                                </li>
                            );
                        })}
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
