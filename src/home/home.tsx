import React from 'react';
import { Nav } from '../nav';
import LogoType from '../images/logo-austmed-red-white.svg';

export const Home: React.FC = () => {
    return (
        <>
            <Nav />
            <div className="am__hero">
                <div className={'container'} data-testid='home'>
                    <div className="row">
                        <div className="col-12 py-5 am__hero-col">
                            <img id={'am__logo-type'} src={LogoType} alt="" />
                            <span className={'h1 display-5 fw-bold text-white'}>
                                Lorem ipsum dolor sit amet.
                            </span>
                            <p className={'fs-5 text-white text-center'}>
                                A better, longer description goes here. Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Suspendisse vel erat non ex mollis
                                placerat ac vitae metus. Mauris commodo nec
                                erat ut ultricies. Sed at nulla rutrum,
                                malesuada elit eu, vehicula purus. Vestibulum
                                convallis accumsan eros, in pharetra leo
                                blandit non. In vitae elementum nisi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="am__sim-promo-block">
            </div>
        </>
    );
};
