import React, { useState } from 'react';
import { Nav } from '../nav';
import { Background } from '../background';
import BackgroundImage from '../images/iStock-1217277545.jpg';
import DATA from '../data/medkit.json';

interface MedkitItem {
    category: string;
    item: string;
    points: string;
}

export const Medkit: React.FC = () => {
    const [itemsPicked, setItemsPicked] =
        useState<boolean[]>((new Array(DATA.length)).fill(false));

    const [totalItemsPicked, totalItemsScore] = itemsPicked.reduce((acc, val, idx) => {
        if (val) {
            acc[0] += 1;
            acc[1] += Number(DATA[idx].points);
        }
        return acc;
    }, [0, 0]);

    const handlePickItem = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>): void => {
        const idx = Number(evt.target.id);
        setItemsPicked((prev) => {
            const newList = [...prev];
            newList[idx] = !newList[idx];
            return newList;
        });
    };
    return (
        <>
            <Nav />
            <div className={'container medkit__content'} data-testid='medkit'>
                <div className={'row'}>
                    <div className="col-12">
                        <h1>Medkit sim</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <form>
                            <table className={'table table-light table-sm'}>
                                <thead>
                                    <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Points</th>
                                        <th scope="col">Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DATA.map((el: MedkitItem, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <th scope="row">{el.category}</th>
                                                <td>{el.item}</td>
                                                <td>{el.points}</td>
                                                <td>
                                                    <input
                                                        className={'btn-check'}
                                                        type='checkbox'
                                                        id={String(idx)}
                                                        onChange={handlePickItem}
                                                        autoComplete={'off'}
                                                        checked={itemsPicked[idx]}
                                                        disabled={itemsPicked[idx]}/>
                                                    <label className={'btn btn-sm btn-danger'}
                                                        htmlFor={String(idx)}>
                                                        Add
                                                    </label>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div id={'medkit__basket'} className="sticky-top bg-danger">
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Points</th>
                                        <th scope="col">Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemsPicked.every((el) => !el) ? (
                                        <tr>
                                            <th scope={'row'} colSpan={4}>Your kit has not been packed yet.</th>
                                        </tr>
                                    ) : (
                                        <>
                                            {DATA.map((el, idx) => {
                                                return (
                                                    <React.Fragment key={idx}>
                                                        {itemsPicked[idx] && (
                                                            <tr>
                                                                <th scope="row">{el.category}</th>
                                                                <td>{el.item}</td>
                                                                <td>{el.points}</td>
                                                                <td>
                                                                    <button type="button"
                                                                        className="btn btn-light"
                                                                        id={String(idx)}
                                                                        onClick={handlePickItem}>
                                                                        Remove
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td>{totalItemsPicked} Items</td>
                                        <td>{totalItemsScore} Points</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Background backgroundImageSrc={BackgroundImage as string}/>
        </>
    );
};

