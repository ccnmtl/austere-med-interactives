// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React, { useState, useRef } from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import { PatientSet } from './index';
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
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const Triage: React.FC = () => {
    const [simStarted, setSimStarted] = useState<boolean>(false);
    const patientSetRef = useRef(null);
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
        a.src = audioURL;
        audioRef.current = a;
    };

    const handleStart = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        evt.preventDefault();
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

    return (
        <>
            <Nav title={'Patient Triage Simulation'} items={navItems}/>
            <div className={'container triage__content'} data-testid='triage'>
                {!simStarted ? (<>
                    <div className="row">
                        <div className="col-12">
                            <h1>Patient Triage Simulation</h1>
                            <p className="lead">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p>
                                Duis et sagittis purus. Aenean convallis ligula
                                eleifend enim volutpat auctor. Praesent in volutpat
                                quam. Pellentesque sodales lectus semper augue scelerisque
                                egestas. Praesent libero augue, tempus eget interdum vel,
                                vestibulum et tortor. Quisque rhoncus leo tortor, nec
                                pretium lacus venenatis interdum. Aenean varius suscipit
                                tempus.
                            </p>
                            <p>
                                Vestibulum at aliquet arcu, et auctor lectus.
                                Phasellus a eros elit. Nulla quis mi ac nunc
                                consectetur mattis. Integer sed malesuada ligula.
                                Curabitur venenatis turpis in ex facilisis rhoncus.
                                Morbi feugiat sagittis vestibulum. Nam rhoncus, lectus
                                in mattis pretium, augue nunc vestibulum velit,
                                dignissim hendrerit nibh purus in libero. Nunc sagittis
                                ullamcorper mi, vel luctus risus dapibus eu. Integer
                                vehicula vitae tortor vel fermentum. Phasellus
                                pellentesque felis sed consectetur elementum. Curabitur
                                vitae lectus velit. Phasellus at lacus diam. Aenean
                                fermentum lorem non velit faucibus rutrum. Mauris id
                                eros bibendum, dictum erat sit amet, bibendum orci.
                                Donec sit amet nisl et libero venenatis hendrerit. Duis
                                non fermentum lacus.
                            </p>
                            {window.localStorage.getItem('triage') ? (<>
                                <p>
                                    You have already completed the triage sim.
                                    &nbsp;<a href={'/triage/reflection'}>Reflection</a>
                                    &nbsp;<a href={'/triage/summary'}>Summary</a>
                                </p>
                                <p>
                                    Click <button className={'btn btn-danger btn-lg'}
                                        onClick={handleStart}>here</button>
                                    &nbsp;to reset your choices and retake the sim
                                </p>
                            </>) : (
                                <button onClick={handleStart} data-testid='triage-start'>
                                    Engage
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

