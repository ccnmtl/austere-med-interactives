import React from 'react';
import { render } from '@testing-library/react';
import { Nav } from './nav';
import { MemoryRouter } from 'react-router-dom';

describe('Initial test', () => {
    const renderComponent = () => render(<MemoryRouter><Nav /></MemoryRouter>);
    it('Should render the nav component', () => {
        const { getByTestId } = renderComponent();
        const component = getByTestId('nav');
        expect(component).toBeVisible();
    });
});

