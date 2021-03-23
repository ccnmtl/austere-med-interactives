import React from 'react';
import { render } from '@testing-library/react';
import { Triage } from './triage';
import { MemoryRouter } from 'react-router-dom';

describe('Triage sim test', () => {
    const renderComponent = () => render(<MemoryRouter><Triage /></MemoryRouter>);
    it('Should render the triage page component', () => {
        const { getByTestId } = renderComponent();
        const component = getByTestId('triage');
        expect(component).toBeVisible();
    });
});
