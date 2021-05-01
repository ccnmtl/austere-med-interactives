import React from 'react';
import { render } from '@testing-library/react';
import { About } from './about';
import { MemoryRouter } from 'react-router-dom';

describe('About page test', () => {
    const renderComponent = () => render(
        <MemoryRouter>
            <About />
        </MemoryRouter>
    );
    it('Should render the about page component', () => {
        const { getByTestId } = renderComponent();
        const component = getByTestId('about');
        expect(component).toBeVisible();
    });
});
