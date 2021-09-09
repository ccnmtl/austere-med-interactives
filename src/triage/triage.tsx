// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React, { useState, useRef } from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import { PatientSet } from './index';
import { Modal } from '../modal';
import DATA from '../data/triage.json';
import TriageImg from '../images/iStock-1217878707.jpg';

export interface TriageSelectionData {
    timeToAnswer: number;
    completedOnTime: boolean;
    q1: boolean;
    q2: boolean;
    q3: boolean;
    q4: boolean;
    q5: boolean;
    q6: boolean;
    esi: string;
    location: string;
    airway: string;
    consult: string;
    reflection: string;
}

export const resetTriageSelectionData = (): void => {
    const initialData: TriageSelectionData = {
        timeToAnswer: Infinity,
        completedOnTime: false,
        q1: false,
        q2: false,
        q3: false,
        q4: false,
        q5: false,
        q6: false,
        esi: '',
        location: '',
        airway: '',
        consult: '',
        reflection: ''
    };

    const initList = [...new Array<TriageSelectionData>(DATA.length)].fill(initialData);
    window.localStorage.setItem('triage', JSON.stringify(initList));
};

export const getTriageSelectionData = (): TriageSelectionData[] => {
    return JSON.parse(window.localStorage.getItem('triage')) as TriageSelectionData[];
};

export const setTriageSelectionData = (
    idx: number, key: string, value: string | boolean | number): void => {
    const data = JSON.parse(window.localStorage.getItem('triage')) as TriageSelectionData[];
    if (key in data[idx]) {
        data[idx][key] = value;
        window.localStorage.setItem('triage', JSON.stringify(data));
    }
};

export const printFSeconds = (seconds: number): string => {
    const t = new Date(seconds * 1000);
    const m = t.getMinutes();
    const s = t.getSeconds();
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}`;
};

export const Triage: React.FC = () => {
    const [simStarted, setSimStarted] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const stopAllAudio = (): void => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };

    const playAudio = (audioURL: string): void => {
        // Stop all audio
        stopAllAudio();
        // Start the first audio
        const a = new Audio();
        // eslint-disable-next-line scanjs-rules/call_addEventListener
        a.addEventListener('canplaythrough', () => {
            void a.play();
        });
        // eslint-disable-next-line scanjs-rules/assign_to_src
        a.src = audioURL + `?cache=${__BUILD__}`;
        audioRef.current = a;
    };

    const handleStart = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        evt.preventDefault();
        setSimStarted(true);
        playAudio(DATA[0].promptAudio);
    };

    const handleRestart = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        evt.preventDefault();
        setShowModal(true);
    };

    const modalCancel = () => {
        setShowModal(false);
    };

    const modalConfirm = () => {
        setShowModal(false);
        setSimStarted(true);
        playAudio(DATA[0].promptAudio);
    };

    const navItems = [
        {
            text: 'Step 1. Introduction',
            active: true,
            link: simStarted ? '/triage' : '#',
        },
        {
            text: 'Step 2. Engage',
            active: simStarted,
            link: '#'
        },
        {
            text: 'Step 3. Reflect',
            active: false,
            link: '/triage/reflection'
        },
        {
            text: 'Step 4. Summary',
            active: false,
            link: '/triage/summary'
        }
    ];

    React.useEffect(() => {
        document.title = 'Patient Triage Simulation | Austere Medicine Virtual Simulations';
    });

    return (
        <>
            <Nav title={'Patient Triage Simulation'} items={navItems}/>
            <div className={'container triage__content'} data-testid='triage'>
                {!simStarted ? (<>
                    <div className="row">
                        <div className="col-12">
                            <h1>Patient Triage Simulation</h1>
                            <p className="lead">
                                Triage an influx of EMS patients
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p>
                                For this simulation, you are part of a team
                                responsible for emergency preparedness and
                                clinical operations at a 100K visit per year
                                emergency department at an academic medical center
                                in New York City. The ED sees only adults and is
                                located in a tertiary care center with all
                                available specialities and ICU capacity. The
                                simulation assumes NYC is in the middle of an
                                outbreak of an influenza-like illness, with EMS
                                volumes reaching record highs and more than 300
                                patients per day presenting to the adult ED. You,
                                the learner, are put in the the role of a triage
                                officer assigned to the EMS triage area to help
                                direct the rapid inflow of patients.
                            </p>
                            <p>
                                You will be presented with 10 patients in rapid
                                succession and will have a finite amount of
                                time to decide: the patients ESI levels, what
                                respiratory intervention they need (if any), and
                                where to send the patient. You will be presented
                                (by the EMT) with the patient&apos;s chief complaint and
                                will have the opportunity to request follow up
                                information. As in a real ED, there are a limited
                                number of trauma & High acuity beds available, as
                                well as senior physicians that can support you -
                                you must use your resources wisely!  Following the
                                10 patients, you will have a moment to reflect on
                                your experience and view a summary of what you
                                selected.
                            </p>
                            <p>
                                A short demo video is available to orient you
                                to the simulation interface before you begin.
                            </p>
                            <div className="ratio ratio-16x9 mb-4">
                                <iframe
                                    src="https://www.youtube.com/embed/PC_0zuCAqiY"
                                    title="Austere Medicine: Triage Simulation Overview"
                                    allowFullScreen>
                                </iframe>
                            </div>
                            <p>
                                There are no “correct” answers for this
                                exercise, instead you should be thoughtful
                                about the decisions you are making, with the
                                resources you have available to you. For Columbia
                                University students, this simulation is followed by
                                a live group debrief to discuss your experiences.
                            </p>
                            <p>
                                Your responses will be automatically saved, in
                                your browser&apos;s cache, so you can revisit this
                                simulation at any time to review or edit your
                                responses (for Columbia students, we ask that you
                                go through the simulation only once, before the
                                debrief session - after which you are welcome to
                                engage with the simulation as much as you like).
                            </p>
                            {window.localStorage.getItem('triage') ? (<>
                                <div className="alert alert-success">
                                    You have already completed the triage sim. Update
                                    your <a className={'alert-link'} href={'/triage/reflection'}>
                                    reflection</a> or review
                                    your <a className={'alert-link'} href={'/triage/summary'}>
                                    summary</a>.
                                </div>
                                <button className={'btn btn-danger btn-lg'}
                                    onClick={handleRestart}>Restart
                                </button>
                                {showModal && (
                                    <Modal
                                        title={'Restart Triage Simulation'}
                                        // eslint-disable-next-line max-len
                                        bodyText={'Restarting the simulation will clear your previously selections. Are you sure that you would like to proceed?'}
                                        cancelText={'Cancel'}
                                        confirmText={'Restart Simulation'}
                                        cancelFunc={modalCancel}
                                        confirmFunc={modalConfirm}/>
                                )}
                            </>) : (
                                <button
                                    className={'btn btn-danger btn-lg'}
                                    onClick={handleStart}
                                    data-testid='triage-start'>
                                    Start
                                </button>
                            )}
                        </div>
                        <div className="col-6">
                            <img className={'img-fluid'} src={TriageImg}/>
                        </div>
                    </div>
                </>) : (
                    <PatientSet
                        stopAllAudio={stopAllAudio}
                        playAudio={playAudio}
                        patients={DATA}/>
                )}
            </div>
            <Background backgroundImageSrc={BackgroundImage}/>
        </>
    );
};

