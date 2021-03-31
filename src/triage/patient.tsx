import React, { useRef, useEffect } from 'react';

// NOTE: this interface needs to match the column headings in the data csv
export interface Patient {
    countdown: string;
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
    const audioRef = useRef<HTMLAudioElement[]>([]);
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

    useEffect(() => {
        // Clean up playing video when patient prop changes
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

    return (
        <div>
            <ul>
                <li>Prompt text: {patient.promptText}</li>
                <li>Prompt audio: {patient.promptAudio}</li>
                <li>Q1 text: {patient.q1Text}</li>
                <li>
                    Q1 audio: {patient.q1Audio}
                    <button
                        className="btn btn-sm btn-primary"
                        data-qaudio={'q1Audio'}
                        onClick={handleAudioClick}>
                        Play
                    </button>
                </li>
                <li>Q2 text: {patient.q2Text}</li>
                <li>
                    Q2 audio: {patient.q2Audio}
                    <button
                        className="btn btn-sm btn-primary"
                        data-qaudio={'q2Audio'}
                        onClick={handleAudioClick}>
                        Play
                    </button>
                </li>
                <li>Q3 text: {patient.q3Text}</li>
                <li>
                    Q3 audio: {patient.q3Audio}
                    <button
                        className="btn btn-sm btn-primary"
                        data-qaudio={'q3Audio'}
                        onClick={handleAudioClick}>
                        Play
                    </button>
                </li>
                <li>Q4 text: {patient.q4Text}</li>
                <li>
                    Q4 audio: {patient.q4Audio}
                    <button
                        className="btn btn-sm btn-primary"
                        data-qaudio={'q4Audio'}
                        onClick={handleAudioClick}>
                        Play
                    </button>
                </li>
                <li>Q5 text: {patient.q5Text}</li>
                <li>
                    Q5 audio: {patient.q5Audio}
                    <button
                        className="btn btn-sm btn-primary"
                        data-qaudio={'q5Audio'}
                        onClick={handleAudioClick}>
                        Play
                    </button>
                </li>
                <li>Q6 text: {patient.q6Text}</li>
                <li>
                    Q6 audio: {patient.q6Audio}
                    <button
                        className="btn btn-sm btn-primary"
                        data-qaudio={'q6Audio'}
                        onClick={handleAudioClick}>
                        Play
                    </button>
                </li>
            </ul>
        </div>
    );
};
