// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217277545.jpg';

export const About: React.FC = () => {
    return (
        <>
            <Nav title={'About'} showAbout={false}/>
            <div className={'container about__content'} data-testid='about'>
                <div className={'row justify-content-between'}>
                    <div className="col-12 col-md-6">
                        <h1>About</h1>
                        <p>
                            The Austere Medicine site consists of two
                            independent simulations - the Medical Kit
                            simulation and the Patient Triage simulation. Designed
                            for use in the VP&amp;S Austere Medicine Elective, the two
                            simulations aim to provide learners with opportunities to
                            learn about medical care in resource-limited settings. The
                            Medical Kit simulation offers students three different
                            scenarios where they must decide what medical supplies they
                            would pack. The Patient Triage simulation puts learners
                            in the perspective of a triage officer assigned to the EMS triage
                            area to help direct the rapid inflow of patients. The simulations
                            are intended to be part of a learning sequence. It is
                            recommended that learners have preparatory materials leading up to
                            each simulation, followed by reflection and/or a group discussion
                            focusing on what decisions learners made and why, what they found
                            challenging, what additional information would they have wanted,
                            and what would they do differently in the future.
                        </p>
                        <p>
                            Through a Provost’s grant at Columbia University,
                            in collaboration with the Center for Teaching and
                            Learning, the Austere Medicine site was developed in
                            collaboration with faculty from the Emergency Medicine
                            department at the Columbia University Irving Medical
                            Center, for use in the VP&amp;S Austere Medicine Elective.
                            The site is open to the public and we encourage others
                            to use the simulations and share their feedback with
                            us.
                        </p>
                        <h2>Credits</h2>
                        <h3>Faculty Partners</h3>
                        <ul>
                            <li>
                                Dr. Christopher Tedeschi<br/>
                                Associate Professor of Emergency Medicine<br/>
                                Director of Emergency Preparedness, NYP-CUIMC Emergency Medicine
                            </li>
                            <li>
                                Dr. Dana Levin<br/>
                                Assistant Professor of Emergency Medicine
                            </li>
                            <li>
                                Dr. Kiran Pandit<br/>
                                Assistant Clinical Professor of Emergency Medicine
                            </li>
                            <li>
                                Dr. Raleigh Todman<br/>
                                Assistant Professor of Emergency Medicine
                            </li>
                        </ul>
                        <h3>CTL Production Team</h3>
                        <p>
                            <strong>Executive Director:</strong> Catherine Ross<br/>
                            <strong>Senior Director:</strong> Maurice Matiz<br/>
                            <strong>Producer:</strong> Ashley Kingon<br/>
                            <strong>Project Management:</strong> Meesha Meksin<br/>
                            <strong>Media Production:</strong> Michael DeLeon<br/>
                            <strong>Programming &amp; Development:</strong> Nick Buonincontri<br/>
                            <strong>User Interface Design &amp; Interaction:</strong>
                            Marc Raymond<br/>
                        </p>
                        <h2>License</h2>
                        <div>
                            <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                                <img alt="Creative Commons License"
                                    src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"/>
                            </a>
                        </div>
                        <p>
                            This work is licensed under a <a rel="license"
                                href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                                Creative Commons Attribution-NonCommercial-ShareAlike
                                4.0 International License</a>.
                        </p>
                    </div>
                    <div className="col-12 col-md-5 pt-md-5">
                        <h3>Contact</h3>
                        <p>
                            Please reach out for bugs, questions, or more
                            information about the project.
                        </p>
                        <a href={'mailto:ctl-austeremedicine@columbia.edu'}
                            className={'btn btn-danger'}>
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage}/>
        </>
    );
};
