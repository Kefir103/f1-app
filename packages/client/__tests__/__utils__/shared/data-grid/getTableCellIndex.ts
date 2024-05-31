import { screen } from '@testing-library/react';

export const getTableCellIndex = (headerText: string) =>
    screen
        .getAllByRole('columnheader')
        .findIndex((colHeader) => colHeader.textContent === headerText);
