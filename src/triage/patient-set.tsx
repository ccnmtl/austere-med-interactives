import React, { useState, useEffect, useRef } from 'react';
import { Patient, PatientPanel } from './index';

interface PatientSetProps {
    patients: Patient[];
    setSimFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PatientSet: React.FC<PatientSetProps> = ({
    patients, setSimFinished}: PatientSetProps) => {
    const [currentPatient, setCurrentPatient] = useState<number | null>(null);
    const [countdownClock, setCountdownClock] = useState<number | null>(null);
    const [finished, setFinished] = useState<boolean>(false);
    const interval = useRef<number | null>(null);

    const countdown = (idx: number): void => {
        setCountdownClock((prev) => {
            if (prev == 0) {
                window.clearInterval(interval.current);
                if (idx >= patients.length - 1) {
                    setFinished(true);
                    return;
                } else {
                    startPatientPanel(idx + 1);
                    return;
                }
            } else {
                return prev - 1;
            }
        });
    };

    const startPatientPanel = (idx: number): void => {
        setCurrentPatient(idx);
        setCountdownClock(Number(patients[idx].countdown));
        // Now start timer, and countdown clock
        // eslint-disable-next-line scanjs-rules/call_setInterval
        interval.current = window.setInterval(countdown, 1000, idx);
    };

    useEffect(() => {
        if (finished) {
            setSimFinished(true);
        }
    }, [finished]);

    useEffect(() => {
        startPatientPanel(0);
    }, []);

    return (
        <div data-testid='patient-set'>
            <h2>Counter: {countdownClock}</h2>
            <h2>Pantient Idx: {currentPatient}</h2>
            {currentPatient >= 0 && currentPatient < patients.length &&
                patients[currentPatient] && (
                <PatientPanel patient={patients[currentPatient]}/>
            )}
        </div>
    );
};
