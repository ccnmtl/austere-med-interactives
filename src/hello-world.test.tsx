import React from 'react';
import { render } from '@testing-library/react';
import { Test } from './hello-world';

describe('Initial test', () => {
    const renderComponent = () => render(<Test />);
    it('Should render the root component', () => {
        const { getByTestId } = renderComponent();
        const component = getByTestId('example');
        expect(component).toBeVisible();
    });
});
