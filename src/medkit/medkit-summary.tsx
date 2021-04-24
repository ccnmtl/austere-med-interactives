// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React, {useState, useEffect} from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217277545.jpg';
import DATA from '../data/medkit.json';
import { getMedkitData } from './medkit';
import { saveAs } from 'file-saver';

const CATEGORY_HIST = DATA.reduce((acc, val) => {
    const freq = acc.get(val.category);
    acc.set(val.category, freq ? freq + 1 : 1);
    return acc;
}, new Map<string, number>());

const getMedkitPoints = (items: boolean[]): number => {
    return DATA.reduce((acc, val, idx) => {
        if (items[idx]) {
            acc += Number(val.points);
        }
        return acc;
    }, 0);
};

const KIT_1 = getMedkitData('1');
const KIT_1_POINTS = getMedkitPoints(KIT_1);
const KIT_2 = getMedkitData('2');
const KIT_2_POINTS = getMedkitPoints(KIT_2);
const KIT_3 = getMedkitData('3');
const KIT_3_POINTS = getMedkitPoints(KIT_3);

export const MedkitSummary: React.FC = () => {
    const [csv, setCSV] = useState<string>('');

    useEffect(() => {
        // eslint-disable-next-line max-len
        const csvString = `Category,Item,Points,Kit 1: ${KIT_1_POINTS} Points,Kit 2: ${KIT_2_POINTS} Points,Kit 3: ${KIT_3_POINTS} Points\n`;
        setCSV(DATA.reduce((acc: string, val, idx) => {
            return acc.concat(
                // eslint-disable-next-line max-len
                `${val.category},${val.item},${val.points},${KIT_1[idx] ? 'X' : ''},${KIT_2[idx] ? 'X' : ''},${KIT_3[idx] ? 'X' : ''}\n`
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
            text: 'Step 3. Reflect',
            active: true,
            link: '/medkit/summary'
        }
    ];
    return (
        <>
            <Nav title={'Medical Kit Simulation'} items={navItems}/>
            <div className={'container medkit__content'} data-testid='medkit'>
                <div className={'row'}>
                    <div className="col-10">
                        <h1>Medkit Summary</h1>
                    </div>
                    <div className="col-2">
                        <button
                            type={'button'}
                            onClick={handleDownload}
                            className={'btn btn-primary d-block ms-auto'}>
                            Download Summary
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className={'col-12'}>
                        <table className={'table table-sm bg-light text-center align-middle'}>
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
                                    <th scope={'col'}>Kit 1: {KIT_1_POINTS} Points</th>
                                    <th scope={'col'}>Kit 2: {KIT_2_POINTS} Points</th>
                                    <th scope={'col'}>Kit 3: {KIT_3_POINTS} Points</th>
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
                                            <td>{KIT_1 && KIT_1[idx] && (<>&#10003;</>)}</td>
                                            <td>{KIT_2 && KIT_2[idx] && (<>&#10003;</>)}</td>
                                            <td>{KIT_3 && KIT_3[idx] && (<>&#10003;</>)}</td>
                                        </tr>
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

