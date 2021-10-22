import React, { useState, useEffect } from 'react';
import { getTriageSelectionData, setTriageSelectionData } from './triage';

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
    iconImg: string;
}

interface OutcomeChoices {
    text: string;
    id: string;
    resourceValidator?(): boolean;
}

const AVAILABLE_TRAUMA_SPOTS = 2;
const AVAILABLE_HIGH_ACUITY_SPOTS = 5;
const AVAILABLE_INTUBATION_SPOTS = 3;

// Validators are functions that test if a resource is available
const traumaBayResourceValidator = () => {
    const traumaCount = getTriageSelectionData().reduce((acc, val) => {
        if (val.location == 'Trauma/Resus Bay') {
            acc += 1;
        }
        return acc;
    }, 0);
    return traumaCount < AVAILABLE_TRAUMA_SPOTS;
};

const highAcuityResourceValidator = () => {
    const highAcuityCount = getTriageSelectionData().reduce((acc, val) => {
        if (val.location == 'ED, High Acuity') {
            acc += 1;
        }
        return acc;
    }, 0);
    return highAcuityCount < AVAILABLE_HIGH_ACUITY_SPOTS;
};

const intubationResourceValidator = () => {
    const intubationCount = getTriageSelectionData().reduce((acc, val) => {
        if (val.airway == 'Intubate') {
            acc += 1;
        }
        return acc;
    }, 0);
    return intubationCount < AVAILABLE_INTUBATION_SPOTS;
};

// Resource Limit Components display if a particular resource is available
const LocationResourceLimits: React.FC = () => {
    const [traumaCount, highAcuityCount] = getTriageSelectionData().reduce((acc, val) => {
        if (val.location == 'Trauma/Resus Bay') {
            acc[0] += 1;
        }
        if (val.location == 'ED, High Acuity') {
            acc[1] += 1;
        }
        return acc;
    }, [0, 0]);
    return (<>
        <div>
            <span className={traumaCount >= AVAILABLE_TRAUMA_SPOTS ? 'text-danger' : ''}>
                {traumaCount}/{AVAILABLE_TRAUMA_SPOTS} Trauma Beds Taken
            </span>
        </div>
        <div>
            <span className={highAcuityCount >= AVAILABLE_HIGH_ACUITY_SPOTS ? 'text-danger' : ''}>
                {highAcuityCount}/{AVAILABLE_HIGH_ACUITY_SPOTS} High Acuity Beds Taken
            </span>
        </div>
    </>);
};

const AirwayResourceLimits: React.FC = () => {
    const intubationCount = getTriageSelectionData().reduce((acc, val) => {
        if (val.airway == 'Intubate') {
            acc += 1;
        }
        return acc;
    }, 0);
    return (
        <div>
            <span className={intubationCount >= AVAILABLE_INTUBATION_SPOTS ? 'text-danger' : ''}>
                {intubationCount}/{AVAILABLE_INTUBATION_SPOTS} Senior Physicians Who Can Intubate
            </span>
        </div>
    );
};

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
    {text: '1', id: 'esi-1'},
    {text: '2', id: 'esi-2'},
    {text: '3', id: 'esi-3'},
    {text: '4', id: 'esi-4'},
    {text: '5', id: 'esi-5'}
];

const LOCATION: OutcomeChoices[] = [
    {text: 'Waiting Room', id: 'loc-3'},
    {text: 'ED, Low Acuity', id: 'loc-2'},
    {text: 'ED, High Acuity', id: 'loc-1', resourceValidator: highAcuityResourceValidator},
    {text: 'Trauma/Resus Bay', id: 'loc-0', resourceValidator: traumaBayResourceValidator}
];

const AIRWAY: OutcomeChoices[] = [
    {text: 'No Oxygen', id: 'air-4'},
    {text: 'Nasal Cannula', id: 'air-3'},
    {text: 'High Flow Nasal Cannula', id: 'air-1'},
    {text: 'BiPAP', id: 'air-0'},
    {text: 'Intubate', id: 'air-2', resourceValidator: intubationResourceValidator},
];

const CONSULTATION: OutcomeChoices[] = [
    {text: 'Anesthesia', id: 'consult-0'},
    {text: 'Cardiology', id: 'consult-1'},
    {text: 'OB', id: 'consult-2'},
    {text: 'Palliative', id: 'consult-3'},
    {text: 'Surgery', id: 'consult-4'},
];

interface PatientAssignmentChoiceProps {
    choices: OutcomeChoices[];
    heading: string;
    questionId: string;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    currentPatient: number;
    lockPanel: boolean;
    resourceLimitStatus?: React.FC;
}

const PatientAssignmentChoice: React.FC<PatientAssignmentChoiceProps> = (
    {
        choices, heading, questionId, state, setState, currentPatient, lockPanel,
        resourceLimitStatus
    }: PatientAssignmentChoiceProps) => {
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        setState(evt.target.value);
        setTriageSelectionData(currentPatient, questionId, evt.target.value);
    };
    return (
        <div className="form-group">
            <div>
                <label className={'fw-bold'}>{heading}</label>
            </div>
            {resourceLimitStatus && resourceLimitStatus({})}
            <div
                className="btn-group"
                role="group"
                aria-label="Patient triage selections">
                {choices.map((el, idx) => {
                    return (<React.Fragment key={idx}>
                        {lockPanel ? (
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
                        ) : (
                            <input type="radio"
                                className="btn-check"
                                id={el.id}
                                name={questionId}
                                value={el.text}
                                onChange={changeHandler}
                                checked={state == el.text}
                                aria-disabled={
                                    el.resourceValidator ? !el.resourceValidator() : false}
                                disabled={
                                    el.resourceValidator ? !el.resourceValidator() : false}
                                autoComplete="off"/>
                        )}
                        <label
                            className={'btn ' + (
                                state == el.text ? 'btn-secondary' : 'btn-outline-secondary')}
                            htmlFor={el.id}>
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
    stopAllAudio(): void
    playAudio(audioURL: string): void;
}

export const PatientPanel: React.FC<PatientPanelProps> = (
    {
        patient, currentPatient, lastPatient, lockPanel, setLockPanel,
        startPatientPanel, stopCountdown, countdownClock, timeAllotted,
        stopAllAudio, playAudio
    }: PatientPanelProps) => {
    //const audioRef = useRef<HTMLAudioElement[]>([]);
    const [activePrompt, setActivePrompt] = useState<number>(0);
    const [esiState, setEsiState] = useState<string>('');
    const [locationState, setLocationState] = useState<string>('');
    const [airwayState, setAirwayState] = useState<string>('');
    const [consultState, setConsultState] = useState<string>('');

    const handlePlayAudio = (key: string): void => {
        playAudio(patient[key]);
    };

    const handleFormSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        // Report the seconds left
        // Freeze the progress bar
        // Show the user interface to proceed
        stopAllAudio();
        stopCountdown();
        setLockPanel(true);
    };

    const handleActivePrompt = (activePromptKey: string): void => {
        const selectionKeys = {
            q1Audio: 'q1',
            q2Audio: 'q2',
            q3Audio: 'q3',
            q4Audio: 'q4',
            q5Audio: 'q5',
            q6Audio: 'q6',
        };
        if (activePromptKey in selectionKeys) {
            setTriageSelectionData(currentPatient, selectionKeys[activePromptKey], true);
        }
        setActivePrompt({
            promptAudio: 0,
            q1Audio: 1,
            q2Audio: 2,
            q3Audio: 3,
            q4Audio: 4,
            q5Audio: 5,
            q6Audio: 6,
        }[activePromptKey]);
        handlePlayAudio(activePromptKey);
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
        window.location.pathname = '/triage/reflection';
    };

    const isComplete = (): boolean => {
        return [esiState, locationState, airwayState].every((val) => {
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
            lockPanel: lockPanel,
            resourceLimitStatus: LocationResourceLimits
        },
        {
            heading: 'Airway Decision',
            choices: AIRWAY,
            questionId: 'airway',
            state: airwayState,
            setState: setAirwayState,
            currentPatient: currentPatient,
            lockPanel: lockPanel,
            resourceLimitStatus: AirwayResourceLimits
        },
        {
            heading: 'Optional - Additional Intervention/Consultation',
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
                            className={'btn btn-danger btn-small'}>
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
            <div className="col-md-6">
                <div className="row">
                    <div className="col-12">
                        <h2>Handoff</h2>
                    </div>
                </div>
                <div className="row">
                    <div id="v-pills-tabContent" className="col-6 tab-content">
                        <div className="nav flex-column nav-pills me-3 bg-white triage-pills"
                            role="tablist"
                            aria-orientation="vertical"
                            // TODO: remove style
                            style={{borderRadius: '.25rem'}}>
                            {prompts.map((prompt, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        className={
                                            // eslint-disable-next-line max-len
                                            `nav-link ${activePrompt == idx && !lockPanel ? 'active' : ''}`}
                                        id="v-pills-ems-tab"
                                        type="button"
                                        role="tab"
                                        aria-controls="v-pills-ems"
                                        aria-selected={activePrompt == idx}
                                        aria-disabled={lockPanel}
                                        disabled={lockPanel}
                                        onClick={() => handleActivePrompt(prompt[2])}>
                                        {patient[prompt[0]]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="v-pills-ems"
                                role="tabpanel"
                                aria-labelledby="v-pills-ems-tab">
                                <div
                                    role="alert"
                                    className="alert alert-secondary fs-4"
                                    dangerouslySetInnerHTML={
                                        // eslint-disable-next-line max-len
                                        {__html: patient[prompts[lockPanel ? 0 : activePrompt][1]] as string || ''}}/>
                                {/* TODO: simplify */}
                                {typeof prompts[activePrompt][2] === 'string' && (
                                    <button type="button"
                                        className="btn btn-secondary"
                                        onClick={() => handlePlayAudio(prompts[activePrompt][2])}
                                        aria-disabled={lockPanel}
                                        disabled={lockPanel}>
                                        Replay Audio
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-12">
                        <h2>Assignments</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
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
                                        currentPatient={currentPatient}
                                        resourceLimitStatus={
                                            el.resourceLimitStatus || undefined}/>);
                            })}
                            <div className="form-group">
                                <button type={'button'}
                                    className="btn btn-danger"
                                    aria-disabled={lockPanel}
                                    disabled={lockPanel}
                                    onClick={handleFormSubmit}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
};
