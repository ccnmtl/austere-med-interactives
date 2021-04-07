// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217277545.jpg';
import DATA from '../data/medkit.json';
import { getMedkitData } from './medkit';

const CATEGORY_HIST = DATA.reduce((acc, val) => {
    const freq = acc.get(val.category);
    acc.set(val.category, freq ? freq + 1 : 1);
    return acc;
}, new Map<string, number>());

const KIT_1 = getMedkitData('1');
const KIT_2 = getMedkitData('2');
const KIT_3 = getMedkitData('3');
const KIT_4 = getMedkitData('4');
const KIT_5 = getMedkitData('5');

export const MedkitSummary: React.FC = () => {
    return (
        <>
            <Nav />
            <div className={'container medkit__content'} data-testid='medkit'>
                <div className={'row'}>
                    <div className="col-12">
                        <h1>Medkit Summary</h1>
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
                            </colgroup>
                            <thead>
                                <tr className={'table-dark'}>
                                    <th scope={'col'}>Category</th>
                                    <th scope={'col'}>Item</th>
                                    <th scope={'col'}>Kit 1</th>
                                    <th scope={'col'}>Kit 2</th>
                                    <th scope={'col'}>Kit 3</th>
                                    <th scope={'col'}>Kit 4</th>
                                    <th scope={'col'}>Kit 5</th>
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
                                            <td>{KIT_1 && KIT_1[idx] && (<>&radic;</>)}</td>
                                            <td>{KIT_2 && KIT_2[idx] && (<>&radic;</>)}</td>
                                            <td>{KIT_3 && KIT_3[idx] && (<>&radic;</>)}</td>
                                            <td>{KIT_4 && KIT_4[idx] && (<>&radic;</>)}</td>
                                            <td>{KIT_5 && KIT_5[idx] && (<>&radic;</>)}</td>
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

