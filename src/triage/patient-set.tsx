import React, { useState, useEffect, useRef } from 'react';
import { Patient, PatientPanel, printFSeconds } from './';

interface PatientSetProps {
    patients: Patient[];
}

export const PatientSet: React.FC<PatientSetProps> = ({patients}: PatientSetProps) => {
    const [currentPatient, setCurrentPatient] = useState<number | null>(null);
    const [countdownClock, setCountdownClock] = useState<number | null>(null);
    const [lockPanel, setLockPanel] = useState<boolean>(false);
    const interval = useRef<number | null>(null);

    const countdown = (): void => {
        setCountdownClock((prev) => {
            if (prev == 0) {
                window.clearInterval(interval.current);
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
        // Start the first audio
        const a = new Audio();
        // eslint-disable-next-line scanjs-rules/call_addEventListener
        a.addEventListener('canplaythrough', () => {
            void a.play();
        });
        // eslint-disable-next-line scanjs-rules/assign_to_src
        a.src = patients[idx].q1Audio;

        // Now start timer, and countdown clock
        // eslint-disable-next-line scanjs-rules/call_setInterval
        interval.current = window.setInterval(countdown, 1000);
    };

    const stopCountdown = (): void => {
        window.clearInterval(interval.current);
    };

    useEffect(() => {
        startPatientPanel(0);
    }, []);

    const getPgBarState = (clock: number, patientIdx: number) => {
        let pgBarState = 'bg-success';
        const patientCountdown = Number(patients[patientIdx].countdown);
        if (clock < patientCountdown / 2 && clock >= patientCountdown / 3) {
            pgBarState = 'bg-warning';
        } else if (clock < patientCountdown / 3) {
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
                    You only have <strong>{patients[currentPatient].countdown} seconds </strong>
                    for questioning before you commit to a final decision for Patient One.
                </p>
                {/* TODO remove style */}
                <div className={'progress'} style={{ height: '3em' }}>
                    <div className={`progress-bar ${getPgBarState(countdownClock, currentPatient)}`}
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
                    currentPatient={currentPatient}
                    lastPatient={currentPatient == patients.length - 1}
                    stopCountdown={stopCountdown}
                    startPatientPanel={startPatientPanel}
                    setLockPanel={setLockPanel}
                    lockPanel={lockPanel}/>
            </>)}
        </div>
    );
};
