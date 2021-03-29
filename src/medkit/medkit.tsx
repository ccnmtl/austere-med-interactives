import React, { useState } from 'react';
import { Nav } from '../nav';
import DATA from '../data/medkit.json';

interface MedkitItem {
    item: string;
    value: string;
}

export const Medkit: React.FC = () => {
    const [itemsPicked, setItemsPicked] =
        useState<boolean[]>((new Array(DATA.length)).fill(false));

    const handlePickItem = (evt: React.ChangeEvent<HTMLInputElement>): void => {
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
            <div className={'container'} data-testid='medkit'>
                <h1>Medkit sim</h1>
            </div>
            <div className={'container'}>
                <div className="row">
                    <div className="col-6">
                        <form>
                            {DATA.map((el: MedkitItem, idx) => {
                                return (
                                    <div className={'form-check'} key={idx}>
                                        <label className={'form-check-label'}>
                                            <input
                                                className={'form-check-input'}
                                                type='checkbox'
                                                id={String(idx)}
                                                onChange={handlePickItem}
                                                checked={itemsPicked[idx]}/>
                                            Item name: {el.item} Item value: {el.value}
                                        </label>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                    <div className="col-6">
                        <ul>
                            {DATA.map((el, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        {itemsPicked[idx] && (
                                            <li>
                                                Item name: {el.item} Item value: {el.value}
                                            </li>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

