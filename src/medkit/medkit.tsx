// eslint-disable-next-line max-len
/* eslint-disable scanjs-rules/identifier_localStorage, scanjs-rules/property_localStorage */
import React, { useState, useEffect } from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217277545.jpg';
import DATA from '../data/medkit.json';

interface MedkitItem {
    category: string;
    item: string;
    points: string;
}

const resetMedkitData = (medkitId: string): boolean[] => {
    const initList = (new Array<boolean>(DATA.length)).fill(false);
    window.localStorage.setItem('medkit-' + medkitId, JSON.stringify(initList));
    return initList;
};

export const CATEGORY_HIST = DATA.reduce((acc, val) => {
    const freq = acc.get(val.category);
    acc.set(val.category, freq ? freq + 1 : 1);
    return acc;
}, new Map<string, number>());

export const getMedkitData = (medkitId: string): boolean[] => {
    return JSON.parse(window.localStorage.getItem('medkit-' + medkitId)) as boolean[];
};

export const setMedkitData = (medkitId: string, idx: number, value: boolean): void => {
    const data = JSON.parse(window.localStorage.getItem('medkit-' + medkitId)) as boolean[];
    data[idx] = value;
    window.localStorage.setItem('medkit-' + medkitId, JSON.stringify(data));
};

export const initMedkitData = (medkitId: string): boolean[] => {
    const data = getMedkitData(medkitId);
    return data ? data : resetMedkitData(medkitId);
};

interface MedkitParams {
    title: string;
    scenario: string;
    budget: number;
    medkitId: string;
}

export const Medkit: React.FC<MedkitParams> = (
    {title, scenario, budget, medkitId}: MedkitParams) => {
    const [itemsPicked, setItemsPicked] =
        useState<boolean[]>((new Array(DATA.length)).fill(false));

    const [totalItemsPicked, totalItemsScore] = itemsPicked.reduce((acc, val, idx) => {
        if (val) {
            acc[0] += 1;
            acc[1] += Number(DATA[idx].points);
        }
        return acc;
    }, [0, 0]);

    const handlePickItem = (
        evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>): void => {
        if (evt.currentTarget.id) {
            const idx = Number(evt.currentTarget.id);
            setItemsPicked((prev) => {
                const newList = [...prev];
                newList[idx] = !newList[idx];
                // update local storage
                setMedkitData(medkitId, idx, newList[idx]);
                return newList;
            });
        }
    };

    const resetSelections = (): void => {
        resetMedkitData(medkitId);
        setItemsPicked((new Array(DATA.length)).fill(false));
    };

    useEffect(() => {
        setItemsPicked(initMedkitData(medkitId));
    }, []);

    const navItems = [
        {
            text: 'Step 1. Understand',
            active: true,
            link: '/medkit'
        },
        {
            text: 'Step 2. Engage',
            active: true,
            link: `/medkit/${medkitId}`
        },
        {
            text: 'Step 3. Summary',
            active: false,
            link: '/medkit/summary'
        }
    ];

    return (
        <>
            <Nav title={'Medical Kit Simulation'} items={navItems}/>
            <div className={'container medkit__content'} data-testid='medkit'>
                <div className={'row'}>
                    <div className="col-12">
                        <h1>{title}</h1>
                        <p className="lead">{scenario}</p>
                        <p className="lead">You have {budget} points.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <form>
                            <table className={'table table-light table-sm'}>
                                <thead>
                                    <tr>
                                        <th className={'medkit__col-0'} scope="col">Category</th>
                                        <th className={'medkit__col-1'} scope="col">Item</th>
                                        <th className={'medkit__col-2'} scope="col">Points</th>
                                        <th className={'medkit__col-3'} scope="col">Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DATA.map((el: MedkitItem, idx) => {
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
                                                        rowSpan={CATEGORY_HIST.get(el.category)}>
                                                        {el.category}
                                                    </th>
                                                )}
                                                <td className={
                                                    itemsPicked[idx] ? 'table-active' : ''}>
                                                    {el.item}
                                                </td>
                                                <td className={
                                                    itemsPicked[idx] ? 'table-active' : ''}>
                                                    {el.points}
                                                </td>
                                                <td className={
                                                    itemsPicked[idx] ? 'table-active' : ''}>
                                                    <input
                                                        className={'btn-check'}
                                                        type='checkbox'
                                                        id={String(idx)}
                                                        onChange={handlePickItem}
                                                        autoComplete={'off'}
                                                        checked={itemsPicked[idx]}/>
                                                    <label
                                                        className={'btn btn-sm btn-danger'}
                                                        htmlFor={String(idx)}>
                                                        {itemsPicked[idx] ? 'Remove' : 'Add'}
                                                    </label>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div className="col-md-5">
                        <div id={'medkit__basket'} className="sticky-top bg-danger">
                            <div className={'row bg-dark p-3 mx-0 text-light'}>
                                <div className="col-5">
                                    <p className="h2">
                                        {totalItemsPicked} Item{totalItemsPicked == 1 ? '' : 's'}
                                    </p>
                                </div>
                                <div className="col-7">
                                    <p className="h2">
                                        {totalItemsScore} / {budget} Points
                                    </p>
                                    <p className={'medkit__basket--warning text-warning'}>
                                        {/* eslint-disable-next-line max-len */}
                                        {totalItemsScore >= budget ? 'Your selections are over budget' : ''}
                                    </p>
                                </div>
                                <div className="col-12 d-flex">
                                    {Number(medkitId) > 1 && (
                                        <a
                                            href={`/medkit/${Number(medkitId) - 1}`}
                                            className={'btn btn-secondary me-auto'}>
                                            Previous
                                        </a>
                                    )}
                                    <button
                                        type={'button'}
                                        onClick={resetSelections}
                                        className={'btn btn-secondary ms-auto me-2'}>
                                        Reset Selections
                                    </button>
                                    <a className="btn btn-danger"
                                        href={
                                            // eslint-disable-next-line max-len
                                            Number(medkitId) < 3 ? `/medkit/${Number(medkitId) + 1}` : '/medkit/summary'
                                        }>
                                        {Number(medkitId) < 3 ? 'Next Medkit' : 'Medkit Summary'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage as string}/>
        </>
    );
};
