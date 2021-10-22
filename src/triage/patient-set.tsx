import React, { useState, useEffect, useRef } from 'react';
import {
    Patient, PatientPanel, resetTriageSelectionData, printFSeconds
} from './';

interface PatientSetProps {
    patients: Patient[];
    stopAllAudio(): void;
    playAudio(url: string): void;
}

export const PatientSet: React.FC<PatientSetProps> = (
    {patients, stopAllAudio, playAudio}: PatientSetProps) => {
    const [currentPatient, setCurrentPatient] = useState<number | null>(null);
    const [countdownClock, setCountdownClock] = useState<number | null>(null);
    const [lockPanel, setLockPanel] = useState<boolean>(false);
    const interval = useRef<number | null>(null);

    const countdown = (): void => {
        setCountdownClock((prev) => {
            if (prev == 0) {
                window.clearInterval(interval.current);
                stopAllAudio();
                setLockPanel(true);
                return prev;
            } else {
                return prev - 1;
            }
        });
    };

    const startPatientPanel = (idx: number): void => {
        setLockPanel(false);
        setCurrentPatient(idx);
        setCountdownClock(Number(patients[idx].countdown));
        // When starting the sim, the initial play event needs to occur
        // when there's a click event. For idx == 0, the audio is started
        // by the parent Triage component
        // This particular corner case is to satify Safari's autoplay policies
        // https://webkit.org/blog/6784/new-video-policies-for-ios/
        if (idx > 0) {
            playAudio(patients[idx].promptAudio);
        }

        // Now start timer, and countdown clock
        interval.current = window.setInterval(countdown, 1000);
    };

    const stopCountdown = (): void => {
        stopAllAudio();
        window.clearInterval(interval.current);
    };

    useEffect(() => {
        resetTriageSelectionData();
        startPatientPanel(0);
    }, []);

    const getPgBarState = (clock: number) => {
        let pgBarState = 'bg-success';
        if (clock < 20 && clock > 10) {
            pgBarState = 'bg-warning';
        } else if (clock <= 10) {
            pgBarState = 'bg-danger';
        }
        return pgBarState;
    };

    return (
        <div data-testid='patient-set'>
            {currentPatient >= 0 && currentPatient < patients.length &&
                patients[currentPatient] && (<>
                <h1>Patient {currentPatient + 1}</h1>
                <p className="lead">
                    You only have
                    <strong> {printFSeconds(Number(patients[currentPatient].countdown))} </strong>
                    for questioning before you commit to a final decision for Patient One.
                </p>
                <div className={'triage__progress progress'}>
                    <div className={`progress-bar ${getPgBarState(countdownClock)}`}
                        role="progressbar"
                        style={{
                            width:
                                `${((Number(patients[currentPatient].countdown) - countdownClock) /
                                           Number(patients[currentPatient].countdown) * 100)}%`
                        }}
                        aria-valuenow={countdownClock}
                        aria-valuemin={0}
                        aria-valuemax={Number(patients[currentPatient].countdown)}>
                        <strong>{printFSeconds(countdownClock)}</strong>
                    </div>
                </div>
                <PatientPanel
                    patient={patients[currentPatient]}
                    countdownClock={countdownClock}
                    timeAllotted={
                        Number(patients[currentPatient].countdown)}
                    currentPatient={currentPatient}
                    lastPatient={currentPatient == patients.length - 1}
                    stopCountdown={stopCountdown}
                    startPatientPanel={startPatientPanel}
                    setLockPanel={setLockPanel}
                    lockPanel={lockPanel}
                    stopAllAudio={stopAllAudio}
                    playAudio={playAudio}/>
            </>)}
        </div>
    );
};
