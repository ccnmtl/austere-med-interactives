/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import DATA from '../data/triage.json';
import {getTriageSelectionData, TriageSelectionData} from './';
import { saveAs } from 'file-saver';

export const TriageSummary: React.FC = () => {
    const [selections, setSelections] = useState<TriageSelectionData[]>(null);
    const [csv, setCSV] = useState<string>('');

    useEffect(() => {
        const s = getTriageSelectionData();
        setSelections(s);
        const csvString = 'Time to answer,Completed on time,Question One Asked,Question Two Asked,Question Three Asked,Question Four Asked,Question Five Asked,Question Six Asked,ESI,Location,Airway,Consult,Reflection\n';
        setCSV(s.reduce((acc: string, val) => {
            return acc.concat(
                `${val['timeToAnswer']},${String(val['completedOnTime'])},${String(val['q1'])},${String(val['q2'])},${String(val['q3'])},${String(val['q4'])},${String(val['q5'])},${String(val['q6'])},${val['esi']},${val['location']},${val['airway']},${val['consult']},${val['reflection']}\n`
            );
        }, csvString));

    }, []);
    console.log(csv);

    const handleDownload = (): void => {
        if (csv) {
            const blob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
            saveAs(blob, 'triage-summary.csv');
        }
    };

    return (
        <>
            <Nav />
            <div className={'container triage__content'} data-testid='triage-summary'>
                <div className="row">
                    <div className="col-12">
                        <h1>Summary</h1>
                        <p className="lead">
                            Here&apos;s how you did.
                        </p>
                        {csv && (<button
                            type={'button'}
                            className={'btn btn-primary btn-sm'}
                            onClick={handleDownload}>
                            Download Summary
                        </button>)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className={'table table-sm text-center align-middle'}>
                            <colgroup>
                                {/* TODO move to stylesheet */}
                                <col style={{width: '5%'}}/>
                                <col style={{width: '5%'}}/>
                                <col style={{width: '5%'}}/>
                                <col style={{width: '20%'}}/>
                                <col style={{width: '5%'}}/>
                                <col style={{width: '15%'}}/>
                                <col style={{width: '5%'}}/>
                                <col style={{width: '12%'}}/>
                            </colgroup>
                            <thead>
                                <tr className={'table-dark'}>
                                    <th>Patient</th>
                                    <th colSpan={2}>Complete</th>
                                    <th colSpan={3}>Questions for Patient</th>
                                    <th colSpan={3}>Patient Assignments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selections && DATA.map((patient, idx) => {
                                    return (
                                        <React.Fragment key={idx}>
                                            {/* Row 1 */}
                                            <tr>
                                                <th rowSpan={6} className="bg-info">{idx + 1}</th>
                                                <td rowSpan={6} className="bg-danger text-light">No</td>
                                                <td rowSpan={6} className="bg-danger text-light">00:60 Elapsed</td>
                                                <td>{patient.q1Question}</td>
                                                {!selections[idx].q1 ? (
                                                    <>
                                                        <td className="bg-secondary text-light">Didn&apos;t Ask</td>
                                                        <td className="bg-secondary text-light">{patient.q1Answer}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td></td>
                                                        <td>{patient.q1Answer}</td>
                                                    </>
                                                )}
                                                <td>ESI Level Assignment</td>
                                                {selections[idx].esi ? (
                                                    <>
                                                        <td className="bg-success text-light">Yes</td>
                                                        <td className="bg-success text-light">{selections[idx].esi}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="bg-danger text-light">No</td>
                                                        <td className="bg-danger text-light">No assignment.</td>
                                                    </>
                                                )}
                                            </tr>
                                            {/* Row 2 */}
                                            <tr>
                                                <td>{patient.q2Question}</td>
                                                {!selections[idx].q2 ? (
                                                    <>
                                                        <td className="bg-secondary text-light">Didn&apos;t Ask</td>
                                                        <td className="bg-secondary text-light">{patient.q2Answer}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td></td>
                                                        <td>{patient.q2Answer}</td>
                                                    </>
                                                )}
                                                <td>Location Assignment</td>
                                                {selections[idx].location ? (
                                                    <>
                                                        <td className="bg-success text-light">Yes</td>
                                                        <td className="bg-success text-light">{selections[idx].location}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="bg-danger text-light">No</td>
                                                        <td className="bg-danger text-light">No assignment.</td>
                                                    </>
                                                )}
                                            </tr>
                                            {/* Row 3 */}
                                            <tr>
                                                <td>{patient.q3Question}</td>
                                                {!selections[idx].q3 ? (
                                                    <>
                                                        <td className="bg-secondary text-light">Didn&apos;t Ask</td>
                                                        <td className="bg-secondary text-light">{patient.q3Answer}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td></td>
                                                        <td>{patient.q3Answer}</td>
                                                    </>
                                                )}
                                                <td>Airway Assignment</td>
                                                {selections[idx].airway ? (
                                                    <>
                                                        <td className="bg-success text-light">Yes</td>
                                                        <td className="bg-success text-light">{selections[idx].airway}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="bg-danger text-light">No</td>
                                                        <td className="bg-danger text-light">No assignment.</td>
                                                    </>
                                                )}
                                            </tr>
                                            {/* Row 4 */}
                                            <tr>
                                                <td>{patient.q4Question}</td>
                                                {!selections[idx].q4 ? (
                                                    <>
                                                        <td className="bg-secondary text-light">Didn&apos;t Ask</td>
                                                        <td className="bg-secondary text-light">{patient.q4Answer}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td></td>
                                                        <td>{patient.q4Answer}</td>
                                                    </>
                                                )}
                                                <td>Additional Intervention</td>
                                                {selections[idx].consult ? (
                                                    <>
                                                        <td className="bg-success text-light">Yes</td>
                                                        <td className="bg-success text-light">{selections[idx].consult}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="bg-danger text-light">No</td>
                                                        <td className="bg-danger text-light">No assignment.</td>
                                                    </>
                                                )}
                                            </tr>
                                            {/* Row 5 */}
                                            <tr>
                                                <td>{patient.q5Question}</td>
                                                {!selections[idx].q5 ? (
                                                    <>
                                                        <td className="bg-secondary text-light">Didn&apos;t Ask</td>
                                                        <td className="bg-secondary text-light">{patient.q5Answer}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td></td>
                                                        <td>{patient.q5Answer}</td>
                                                    </>
                                                )}
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {/* Row 6 */}
                                            <tr>
                                                <td>{patient.q6Question}</td>
                                                {!selections[idx].q6 ? (
                                                    <>
                                                        <td className="bg-secondary text-light">Didn&apos;t Ask</td>
                                                        <td className="bg-secondary text-light">{patient.q6Answer}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td></td>
                                                        <td>{patient.q6Answer}</td>
                                                    </>
                                                )}
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage as string}/>
        </>
    );
};
