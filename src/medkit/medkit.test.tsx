import React from 'react';
import { render } from '@testing-library/react';
import { Medkit } from './medkit';
import { MemoryRouter } from 'react-router-dom';

describe('Medkit test', () => {
    const renderComponent = () => render(
        <MemoryRouter>
            <Medkit budget={100} scenario={'test'} medkitId={'1'} />
        </MemoryRouter>
    );
    it('Should render the medkit page component', () => {
        const { getByTestId } = renderComponent();
        const component = getByTestId('medkit');
        expect(component).toBeVisible();
    });
});
