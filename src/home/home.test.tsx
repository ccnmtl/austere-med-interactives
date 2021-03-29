import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './home';
import { MemoryRouter } from 'react-router-dom';

describe('Initial test', () => {
    const renderComponent = () => render(<MemoryRouter><Home /></MemoryRouter>);
    it('Should render the home page component', () => {
        const { getByTestId } = renderComponent();
        const component = getByTestId('home');
        expect(component).toBeVisible();
    });
});

