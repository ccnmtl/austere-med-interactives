import React, { useState, useRef, useEffect } from 'react';
import { setTriageSelectionData } from './triage';
import Nurse from '../images/iStock-155705146.jpg';

// NOTE: this interface needs to match the column headings in the data csv
export interface Patient {
    countdown: string;
    promptQuestion: string;
    promptAnswer: string;
    promptAudio: string;
    q1Question: string;
    q1Answer: string;
    q1Audio: string;
    q2Question: string;
    q2Answer: string;
    q2Audio: string;
    q3Question: string;
    q3Answer: string;
    q3Audio: string;
    q4Question: string;
    q4Answer: string;
    q4Audio: string;
    q5Question: string;
    q5Answer: string;
    q5Audio: string;
    q6Question: string;
    q6Answer: string;
    q6Audio: string;
}

interface OutcomeChoices {
    text: string;
    id: string;
}

const prompts = [
    ['promptQuestion', 'promptAnswer', 'promptAudio'],
    ['q1Question', 'q1Answer', 'q1Audio'],
    ['q2Question', 'q2Answer', 'q2Audio'],
    ['q3Question', 'q3Answer', 'q3Audio'],
    ['q4Question', 'q4Answer', 'q4Audio'],
    ['q5Question', 'q5Answer', 'q5Audio'],
    ['q6Question', 'q6Answer', 'q6Audio']
];

const ESI: OutcomeChoices[] = [
    {text: '5', id: 'esi-5'},
    {text: '4', id: 'esi-4'},
    {text: '3', id: 'esi-3'},
    {text: '2', id: 'esi-2'},
    {text: '1', id: 'esi-1'}
];

const LOCATION: OutcomeChoices[] = [
    {text: 'Trauma/Resus Bay', id: 'loc-0'},
    {text: 'ED, High Acuity', id: 'loc-1'},
    {text: 'ED, Low Acuity', id: 'loc-2'},
    {text: 'Waiting Room', id: 'loc-3'}
];

const AIRWAY: OutcomeChoices[] = [
    {text: 'Bipap', id: 'air-0'},
    {text: 'High Flow Nasal Cannula', id: 'air-1'},
    {text: 'Intubate', id: 'air-2'},
    {text: 'Nasal Cannula', id: 'air-3'},
    {text: 'No Oxygen', id: 'air-4'}
];

const CONSULTATION: OutcomeChoices[] = [
    {text: 'Anesthesia', id: 'consult-0'},
    {text: 'Cardiology', id: 'consult-1'},
    {text: 'OB', id: 'consult-2'},
    {text: 'Palliative', id: 'consult-3'},
    {text: 'Surgery', id: 'consult-4'},
    {text: 'EKG', id: 'consult-5'},
    {text: 'FSBG', id: 'consult-6'}
];

interface PatientAssignmentChoiceProps {
    choices: OutcomeChoices[];
    heading: string;
    questionId: string;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    currentPatient: number;
    lockPanel: boolean;
}

const PatientAssignmentChoice: React.FC<PatientAssignmentChoiceProps> = (
    {
        choices, heading, questionId, state, setState, currentPatient, lockPanel
    }: PatientAssignmentChoiceProps) => {
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        setState(evt.target.value);
        setTriageSelectionData(currentPatient, questionId, evt.target.value);
    };
    return (
        <div className="form-group">
            <div>
                <label >{heading}</label>
            </div>
            <div
                className="btn-group btn-group-sm"
                role="group"
                aria-label="Basic radio toggle button group">
                {choices.map((el, idx) => {
                    return (<React.Fragment key={idx}>
                        <input type="radio"
                            className="btn-check"
                            id={el.id}
                            name={questionId}
                            value={el.text}
                            onChange={changeHandler}
                            checked={state == el.text}
                            aria-disabled={lockPanel}
                            disabled={lockPanel}
                            autoComplete="off"/>
                        <label className="btn btn-secondary" htmlFor={el.id}>
                            {el.text}
                        </label>
                    </React.Fragment>);
                })}
            </div>
            <hr />
        </div>);
};

interface PatientPanelProps {
    patient: Patient;
    currentPatient: number;
    timeAllotted: number;
    lastPatient: boolean;
    countdownClock: number;
    lockPanel: boolean;
    setLockPanel(lock: boolean): void;
    startPatientPanel(panel: number): void;
    stopCountdown(): void;
}

export const PatientPanel: React.FC<PatientPanelProps> = (
    {
        patient, currentPatient, lastPatient, lockPanel, setLockPanel,
        startPatientPanel, stopCountdown, countdownClock, timeAllotted
    }: PatientPanelProps) => {
    const audioRef = useRef<HTMLAudioElement[]>([]);
    const [activePrompt, setActivePrompt] = useState<number>(0);
    const [esiState, setEsiState] = useState<string>('');
    const [locationState, setLocationState] = useState<string>('');
    const [airwayState, setAirwayState] = useState<string>('');
    const [consultState, setConsultState] = useState<string>('');

    const handleAudioClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        if (evt.currentTarget.dataset && evt.currentTarget.dataset.qaudio) {
            const qXAudio = evt.currentTarget.dataset.qaudio;
            const a = new Audio();
            // eslint-disable-next-line scanjs-rules/call_addEventListener
            a.addEventListener('canplaythrough', () => {
                void a.play();
            });

            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, scanjs-rules/assign_to_src
            a.src = patient[qXAudio];
            audioRef.current.push(a);
        }
    };

    const handleFormSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        // Report the seconds left
        // Freeze the progress bar
        // Show the user interface to proceed
        stopCountdown();
        setLockPanel(true);
    };

    const handleActivePrompt = (activePrompt: number): void => {
        const c = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
        setTriageSelectionData(currentPatient, c[activePrompt - 1], true);
        setActivePrompt(activePrompt);
    };

    const saveTimeAndCompletedData = (): void => {
        setTriageSelectionData(
            currentPatient, 'timeToAnswer', timeAllotted - countdownClock);
        setTriageSelectionData(
            currentPatient, 'completedOnTime', isComplete());
    };

    const advanceToNextPatient = (): void => {
        saveTimeAndCompletedData();
        startPatientPanel(currentPatient + 1);
    };

    const advanceToReflection = (): void => {
        saveTimeAndCompletedData();
        //eslint-disable-next-line scanjs-rules/assign_to_pathname
        window.location.pathname = '/triage/reflection';
    };

    const isComplete = (): boolean => {
        return [esiState, locationState, airwayState, consultState].every((val) => {
            return val != '';
        });
    };

    const outcomeMenuItems: PatientAssignmentChoiceProps[] = [
        {
            heading: 'ESI Level Assignment',
            choices: ESI,
            questionId: 'esi',
            state: esiState,
            setState: setEsiState,
            currentPatient: currentPatient,
            lockPanel: lockPanel
        },
        {
            heading: 'Location Assignment',
            choices: LOCATION,
            questionId: 'location',
            state: locationState,
            setState: setLocationState,
            currentPatient: currentPatient,
            lockPanel: lockPanel
        },
        {
            heading: 'Airway Decision',
            choices: AIRWAY,
            questionId: 'airway',
            state: airwayState,
            setState: setAirwayState,
            currentPatient: currentPatient,
            lockPanel: lockPanel
        },
        {
            heading: 'Additional Intervention/Consultation with',
            choices: CONSULTATION,
            questionId: 'consult',
            state: consultState,
            setState: setConsultState,
            currentPatient: currentPatient,
            lockPanel: lockPanel
        }
    ];

    useEffect(() => {
        setActivePrompt(0);
        setEsiState('');
        setLocationState('');
        setAirwayState('');
        setConsultState('');
        // Clean up playing audio when patient prop changes
        return () => {
            for (const audioEl of audioRef.current) {
                if (!audioEl.ended) {
                    audioEl.pause();
                }
            }
            // GC the audio elements
            audioRef.current = [];
        };
    }, [patient]);

    return (<>
        {!lockPanel && (
            <div className={'row triage-alert-spacer'}></div>
        )}
        {lockPanel && (
            <div className="row">
                <div className="col-12">
                    <div className={
                        'alert ' + (isComplete() ? 'alert-success' : 'alert-danger')}>
                        {isComplete() ? (
                            <>Great job! &nbsp;</>
                        ) : (
                            <>Your selections were incomplete &nbsp;</>
                        )}
                        <button
                            type={'button'}
                            onClick={lastPatient ? advanceToReflection : advanceToNextPatient}
                            className={'btn btn-success btn-small'}>
                            {lastPatient ? (
                                <>Proceed to Reflection</>
                            ) : (
                                <>Next patient</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}
        <div className={'row'}>
            <div id="v-pills-tabContent" className="col-md-3 tab-content">
                <div className="nav flex-column nav-pills me-3 bg-white"
                    role="tablist"
                    aria-orientation="vertical"
                    // TODO: remove style
                    style={{borderRadius: '.25rem'}}>
                    {prompts.map((prompt, idx) => {
                        return (
                            <button
                                key={idx}
                                className={
                                    `nav-link ${activePrompt == idx && !lockPanel ? 'active' : ''}`}
                                id="v-pills-ems-tab"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-ems"
                                aria-selected={activePrompt == idx}
                                aria-disabled={lockPanel}
                                disabled={lockPanel}
                                onClick={() => handleActivePrompt(idx)}>
                                {patient[prompt[0]]}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="col-md-3">
                <div className="tab-content" id="v-pills-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="v-pills-ems"
                        role="tabpanel"
                        aria-labelledby="v-pills-ems-tab">
                        <div className="alert alert-info" role="alert">
                            {patient[prompts[activePrompt][1]]}
                        </div>
                        <img className="img-thumbnail" src={Nurse} />
                        {/* TODO: simplify */}
                        {typeof patient[prompts[activePrompt][2]] === 'string' && (
                            <button type="button"
                                className="btn btn-primary btn-sm"
                                onClick={handleAudioClick}
                                aria-disabled={lockPanel}
                                disabled={lockPanel}
                                // TODO: simplify
                                data-qaudio={patient[prompts[activePrompt][2]] as string}>
                                Replay Audio
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <form>
                    {outcomeMenuItems.map((el, idx) => {
                        return (
                            <PatientAssignmentChoice
                                key={idx}
                                heading={el.heading}
                                choices={el.choices}
                                questionId={el.questionId}
                                state={el.state}
                                lockPanel={el.lockPanel}
                                setState={el.setState}
                                currentPatient={currentPatient}/>);
                    })}
                    <div className="form-group">
                        <button type={'button'}
                            className="btn btn-success btn-sm"
                            aria-disabled={lockPanel}
                            disabled={lockPanel}
                            onClick={handleFormSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>);
};
