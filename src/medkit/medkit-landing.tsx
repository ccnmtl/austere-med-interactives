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
            text: 'Step 3. Summary',
            active: false,
            link: '/medkit/summary'
        }
    ];
    return (<>
        <Nav title={'Medical Kit Simulation'} items={navItems}/>
        <div className={'container medkit__content'} data-testid='medkit'>
            <div className="row">
                <div className="col-12">
                    <h1>Medical Kit Simulation</h1>
                    <p className="lead">
                        Pack your kit for different scenarios
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p>
                        For this simulation, you will be “packing” your own
                        Medical Kit, for three different scenarios - A winter
                        mountain expedition, a desert mounting biking trip, and a
                        disaster response.  At the beginning of each scenario you
                        will receive a set number of points, which you can use to
                        select items.  Each item is assigned a point value, from
                        1-6pts, roughly based on weight, size, and cost.  You have
                        as much time as you like to go through each scenario.  At
                        the end of all three scenarios, you will be able to print a
                        copy of your responses.
                    </p>
                    <p>
                        There are no &quot;correct&quot; answers to this exercise,
                        instead you should be thoughtful about what you would
                        pack and think about why you are selecting each item (for
                        Columbia University courses, this simulation is followed by
                        a live group debrief to discuss your selections).
                    </p>
                    <p>
                        Your responses will be automatically saved, in your
                        browsers cache, so you can revisit this simulation at
                        any time to review or edit your responses (for Columbia
                        students, we ask that you go through each scenario only
                        once, before the debrief session - after which you are welcome
                        to revisit the scenarios as often as you like).
                    </p>
                    <div><a className={'btn btn-danger'} href={'/medkit/1'}>Engage</a></div>
                </div>
                <div className="col-md-6 px-5">
                    <img className={'img-fluid'} src={BackgroundImage} alt={'Medkit'} />
                </div>
            </div>
        </div>
        <Background backgroundImageSrc={BackgroundImage}/>
    </>);
};
