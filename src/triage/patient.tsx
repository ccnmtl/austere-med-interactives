import React from 'react';

// NOTE: this interface needs to match the column headings in the data csv
export interface Patient {
    countdown: number;
    promptText: string;
    promptAudio: string;
    q1Text: string;
    q1Audio: string;
    q2Text: string;
    q2Audio: string;
    q3Text: string;
    q3Audio: string;
    q4Text: string;
    q4Audio: string;
    q5Text: string;
    q5Audio: string;
    q6Text: string;
    q6Audio: string;
}

interface PatientPanelProps {
    patient: Patient;
}

export const PatientPanel: React.FC<PatientPanelProps> = ({patient}: PatientPanelProps) => {
    return (
        <div>
            <ul>
                <li>Prompt text: {patient.promptText}</li>
                <li>Prompt audio: {patient.promptAudio}</li>
                <li>Q1 text: {patient.q1Text}</li>
                <li>Q1 audio: {patient.q1Audio}</li>
                <li>Q2 text: {patient.q2Text}</li>
                <li>Q2 audio: {patient.q2Audio}</li>
                <li>Q3 text: {patient.q3Text}</li>
                <li>Q3 audio: {patient.q3Audio}</li>
                <li>Q4 text: {patient.q4Text}</li>
                <li>Q4 audio: {patient.q4Audio}</li>
                <li>Q5 text: {patient.q5Text}</li>
                <li>Q5 audio: {patient.q5Audio}</li>
                <li>Q6 text: {patient.q6Text}</li>
                <li>Q6 audio: {patient.q6Audio}</li>
            </ul>
        </div>
    );
};
