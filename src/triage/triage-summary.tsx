/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217878707.jpg';
import DATA from '../data/triage.json';
import {getTriageSelectionData, TriageSelectionData, printFSeconds} from './';
import { saveAs } from 'file-saver';
import { Logo } from '../logo';

export const TriageSummary: React.FC = () => {
    const [selections, setSelections] = useState<TriageSelectionData[]>(null);
    const [csv, setCSV] = useState<string>('');

    useEffect(() => {
        const s = getTriageSelectionData();
        setSelections(s);
        if (s) {
            const csvString = 'Time to answer,Completed on time,Question One Asked,Question Two Asked,Question Three Asked,Question Four Asked,Question Five Asked,Question Six Asked,ESI,Location,Airway,Consult,Reflection\n';
            setCSV(s.reduce((acc: string, val) => {
                return acc.concat(
                    `${val['timeToAnswer']},${String(val['completedOnTime'])},${String(val['q1'])},${String(val['q2'])},${String(val['q3'])},${String(val['q4'])},${String(val['q5'])},${String(val['q6'])},${val['esi']},${val['location']},${val['airway']},${val['consult']},"${val['reflection']}"\n`
                );
            }, csvString));
        }

    }, []);

    const handleDownload = (): void => {
        if (csv) {
            const blob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
            saveAs(blob, 'triage-summary.csv');
        }
    };

    const navItems = [
        {
            text: 'Step 1. Introduction',
            active: true,
            link: '/triage'
        },
        {
            text: 'Step 2. Engage',
            active: true,
            link: '/triage'
        },
        {
            text: 'Step 3. Reflect',
            active: true,
            link: '/triage/reflection'
        },
        {
            text: 'Step 4. Summary',
            active: true,
            link: '/triage/summary'
        }
    ];

    return (
        <>
            <Nav title={'Triage Simulation'} items={navItems}/>
            <div className={'container triage__content'} data-testid='triage-summary'>
                <div className="row">
                    <div className="col-9">
                        <div className="d-none d-print-block">
                            <Logo />
                        </div>
                        <h1>Patient Triage Simulation Summary</h1>
                    </div>
                    <div className="col-3">
                        <div className={'d-flex d-print-none justify-content-end'}>
                            <button
                                type={'button'}
                                onClick={() => window.print()}
                                className={'btn btn-primary me-2'}>
                                Print
                            </button>
                            <button
                                type={'button'}
                                onClick={handleDownload}
                                className={'btn btn-primary'}>
                                Download Summary
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="lead">
                            Here&apos;s how you did.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {selections && DATA.map((patient, idx) => {
                            return (<React.Fragment key={idx}>
                                <div className={'triage-summary__header'}>Patient {idx + 1}</div>
                                {selections[idx].completedOnTime ? (
                                    <div className={'triage-summary__status success'}>
                                        <div className={'triage-summary__status--head'}>Complete</div>
                                        <div className={'triage-summary__status--value'}>
                                            {`${printFSeconds(selections[idx].timeToAnswer)} / ${printFSeconds(Number(patient.countdown))}`}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={'triage-summary__status timeout'}>
                                        <div className={'triage-summary__status--head'}>Incomplete</div>
                                        <div className={'triage-summary__status--value'}>
                                            {`${printFSeconds(selections[idx].timeToAnswer)} / ${printFSeconds(Number(patient.countdown))}`}
                                        </div>
                                    </div>
                                )}
                                <table className={'table table-sm table-light triage-summary__assignment-table'}>
                                    <colgroup>
                                        <col className={'triage-summary__col-0'} />
                                        <col className={'triage-summary__col-1'} />
                                        <col className={'triage-summary__col-2'} />
                                        <col className={'triage-summary__col-3'} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th rowSpan={4} className={'table-info'}>Assignment Details</th>
                                            <td className={selections[idx].esi != '' ? ('table-info') : ('table-danger')}>
                                                ESI Level Assignment
                                            </td>
                                            <td className={selections[idx].esi != '' ? ('table-info') : ('table-danger')}>
                                                {selections[idx].esi}
                                            </td>
                                            <td className={selections[idx].esi != '' ? ('table-info') : ('table-danger')}>
                                                {selections[idx].esi == '' && (<span className={'badge bg-danger'}>Unassigned</span>)}
                                            </td>
                                        </tr>
                                        <tr className={selections[idx].location != '' ? ('table-info') : ('table-danger')}>
                                            <td>Location</td>
                                            <td>{selections[idx].location}</td>
                                            <td>{selections[idx].location == '' && (<span className={'badge bg-danger'}>Unassigned</span>)}</td>
                                        </tr>
                                        <tr className={selections[idx].airway != '' ? ('table-info') : ('table-danger')}>
                                            <td>Airway</td>
                                            <td>{selections[idx].airway}</td>
                                            <td>{selections[idx].airway == '' && (<span className={'badge bg-danger'}>Unassigned</span>)}</td>
                                        </tr>
                                        <tr className={selections[idx].consult != '' ? ('table-info') : ('table-danger')}>
                                            <td>Consult</td>
                                            <td>{selections[idx].consult}</td>
                                            <td>{selections[idx].consult == '' && (<span className={'badge bg-danger'}>Unassigned</span>)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className={'table table-sm table-light'}>
                                    <colgroup>
                                        <col className={'triage-summary__col-0'} />
                                        <col className={'triage-summary__col-1'} />
                                        <col className={'triage-summary__col-2'} />
                                        <col className={'triage-summary__col-3'} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th rowSpan={6}>Questions</th>
                                            <td className={!selections[idx].q1 ? ('table-secondary') : ('')}>{patient.q1Question}</td>
                                            <td className={!selections[idx].q1 ? ('table-secondary') : ('')}>{patient.q1Answer}</td>
                                            <td className={!selections[idx].q1 ? ('table-secondary') : ('')}>
                                                {!selections[idx].q2 && (<span className={'badge bg-secondary'}>Unasked</span>)}
                                            </td>
                                        </tr>
                                        <tr className={!selections[idx].q2 ? ('table-secondary') : ('')}>
                                            <td>{patient.q2Question}</td>
                                            <td>{patient.q2Answer}</td>
                                            <td>{!selections[idx].q2 && (<span className={'badge bg-secondary'}>Unasked</span>)}</td>
                                        </tr>
                                        <tr className={!selections[idx].q3 ? ('table-secondary') : ('')}>
                                            <td>{patient.q3Question}</td>
                                            <td>{patient.q3Answer}</td>
                                            <td>{!selections[idx].q3 && (<span className={'badge bg-secondary'}>Unasked</span>)}</td>
                                        </tr>
                                        <tr className={!selections[idx].q4 ? ('table-secondary') : ('')}>
                                            <td>{patient.q4Question}</td>
                                            <td>{patient.q4Answer}</td>
                                            <td>{!selections[idx].q4 && (<span className={'badge bg-secondary'}>Unasked</span>)}</td>
                                        </tr>
                                        <tr className={!selections[idx].q5 ? ('table-secondary') : ('')}>
                                            <td>{patient.q5Question}</td>
                                            <td>{patient.q5Answer}</td>
                                            <td>{!selections[idx].q5 && (<span className={'badge bg-secondary'}>Unasked</span>)}</td>
                                        </tr>
                                        <tr className={!selections[idx].q6 ? ('table-secondary') : ('')}>
                                            <td>{patient.q6Question}</td>
                                            <td>{patient.q6Answer}</td>
                                            <td>{!selections[idx].q6 && (<span className={'badge bg-secondary'}>Unasked</span>)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className={'row'}>
                                    <div className="col-6">
                                        <div className="fw-bold">Reflection</div>
                                        <p>{selections[idx].reflection ? selections[idx].reflection : 'No reflection submitted.'}</p>
                                    </div>
                                </div>
                            </React.Fragment>);
                        })}
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage}/>
        </>
    );
};
