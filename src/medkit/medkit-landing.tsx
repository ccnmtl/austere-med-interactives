import React from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217277545.jpg';

export const MedkitLanding: React.FC = () => {

    const navItems = [
        {
            text: 'Step 1. Understand',
            active: true,
            link: '/medkit'
        },
        {
            text: 'Step 2. Engage',
            active: false,
            link: '/medkit/1'
        },
        {
            text: 'Step 1. Reflect',
            active: false,
            link: '/medkit/summary'
        }
    ];
    return (<>
        <Nav title={'Medical Kit Simulation'} items={navItems}/>
        <div className={'container medkit__content'} data-testid='medkit'>
            <div className="row">
                <div className="col-12">
                    <h1>Crisis Overview</h1>
                    <p className="lead">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </p>
                    <div><a className={'btn btn-danger'} href={'/medkit/1'}>Engage</a></div>
                </div>
                <div className="col-md-6 px-5">
                    <img className={'img-fluid'} src={BackgroundImage as string} alt={'Medkit'} />
                </div>
            </div>
        </div>
        <Background backgroundImageSrc={BackgroundImage as string}/>
    </>);
};
