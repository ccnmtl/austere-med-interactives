// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React, {useState, useEffect} from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217277545.jpg';
import DATA from '../data/medkit.json';
import { getMedkitData, CATEGORY_HIST } from './medkit';
import { saveAs } from 'file-saver';
import { Logo } from '../logo';

const getMedkitPoints = (items: boolean[]): number => {
    return DATA.reduce((acc, val, idx) => {
        if (items[idx]) {
            acc += Number(val.points);
        }
        return acc;
    }, 0);
};

export const MedkitSummary: React.FC = () => {
    const [csv, setCSV] = useState<string>('');

    const KIT_1 = getMedkitData('1');
    const KIT_1_POINTS = getMedkitPoints(KIT_1);
    const KIT_2 = getMedkitData('2');
    const KIT_2_POINTS = getMedkitPoints(KIT_2);
    const KIT_3 = getMedkitData('3');
    const KIT_3_POINTS = getMedkitPoints(KIT_3);

    useEffect(() => {
        document.title = 'Medkit Summary | Austere Medicine Virtual Simulations';
    });

    useEffect(() => {
        // eslint-disable-next-line max-len
        const csvString = `Category,Item,Points,Kit 1: ${KIT_1_POINTS} Points,Kit 2: ${KIT_2_POINTS} Points,Kit 3: ${KIT_3_POINTS} Points\n`;
        setCSV(DATA.reduce((acc: string, val, idx) => {
            return acc.concat(
                // eslint-disable-next-line max-len
                `${val.category},${val.item},${val.points},${KIT_1[idx] ? '1' : ''},${KIT_2[idx] ? '1' : ''},${KIT_3[idx] ? '1' : ''}\n`
            );
        }, csvString));
    }, []);

    const handleDownload = (): void => {
        if (csv) {
            const blob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
            saveAs(blob, 'medkit-summary.csv');
        }
    };

    const navItems = [
        {
            text: 'Step 1. Understand',
            active: true,
            link: '/medkit'
        },
        {
            text: 'Step 2. Engage',
            active: true,
            link: '/medkit/1'
        },
        {
            text: 'Step 3. Summary',
            active: true,
            link: '/medkit/summary'
        }
    ];
    return (
        <>
            <Nav title={'Medical Kit Simulation'} items={navItems}/>
            <div className={'container medkit__content'} data-testid='medkit'>
                <div className={'row'}>
                    <div className="col-9">
                        <div className="d-none d-print-block">
                            <Logo />
                        </div>
                        <h1>Medkit Summary</h1>
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
                    <div className={'col-12'}>
                        <table className={
                            // eslint-disable-next-line max-len
                            'table table-sm bg-light text-center align-middle medkit-summary__table'}>
                            <colgroup>
                                <col />
                                <col />
                                <col className={'text-center medkit-summary__col'} />
                                <col className={'medkit-summary__col'} />
                                <col className={'medkit-summary__col'} />
                                <col className={'medkit-summary__col'} />
                                <col className={'medkit-summary__col'} />
                                <col className={'medkit-summary__col'} />
                            </colgroup>
                            <thead>
                                <tr className={'table-dark'}>
                                    <th scope={'col'}>Category</th>
                                    <th scope={'col'}>Item</th>
                                    <th scope={'col'}>Points</th>
                                    <th scope={'col'}>
                                        Kit 1: {KIT_1_POINTS}/80&nbsp;Points
                                    </th>
                                    <th scope={'col'}>
                                        Kit 2: {KIT_2_POINTS}/65&nbsp;Points
                                    </th>
                                    <th scope={'col'}>
                                        Kit 3: {KIT_3_POINTS}/90&nbsp;Points
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {DATA.map((val, idx) => {
                                    let showRowHeader = false;
                                    if (idx == 0) {
                                        showRowHeader = true;
                                    } else if (DATA[idx].category != DATA[idx - 1].category) {
                                        showRowHeader = true;
                                    }

                                    return (
                                        <tr key={idx}>
                                            {showRowHeader && (
                                                <th scope={'rowgroup'}
                                                    rowSpan={CATEGORY_HIST.get(val.category)}>
                                                    {val.category}
                                                </th>
                                            )}
                                            <td>{val.item}</td>
                                            <td>{val.points}</td>
                                            <td>{KIT_1 && KIT_1[idx] && (<>
                                                <span aria-hidden={true}>&#10003;</span>
                                                <span className={'sr-only'}>checked</span>
                                            </>)}
                                            </td>
                                            <td>{KIT_2 && KIT_2[idx] && (<>
                                                <span aria-hidden={true}>&#10003;</span>
                                                <span className={'sr-only'}>checked</span>
                                            </>)}
                                            </td>
                                            <td>{KIT_3 && KIT_3[idx] && (<>
                                                <span aria-hidden={true}>&#10003;</span>
                                                <span className={'sr-only'}>checked</span>
                                            </>)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage}/>
        </>
    );
};

