import React from 'react';
import { render } from '@testing-library/react';
import { Medkit, Medkit1Scenario } from './';
import { MemoryRouter } from 'react-router-dom';

describe('Medkit test', () => {
    const renderComponent = () => render(
        <MemoryRouter>
            <Medkit
                title={'Medkit Scenario'}
                budget={100}
                scenario={Medkit1Scenario}
                medkitId={'1'} />
        </MemoryRouter>
    );
    it('Should render the medkit page component', () => {
        const { getByTestId } = renderComponent();
        const component = getByTestId('medkit');
        expect(component).toBeVisible();
    });
});
