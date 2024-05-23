import { render } from '@testing-library/react';

import { DataGridEmpty } from '~shared/ui/data-grid';

describe('<DataGridEmpty />', () => {
    it('should render default message', () => {
        const { getByText, getByRole } = render(
            <table>
                <tbody>
                    <DataGridEmpty colSpan={1} />
                </tbody>
            </table>,
        );

        // Icon
        expect(getByRole('presentation')).toBeInTheDocument();

        expect(getByText('No data')).toBeInTheDocument();
    });

    it('should render message from props', () => {
        const someMessage = 'some message';

        const { getByText, getByRole } = render(
            <table>
                <tbody>
                    <DataGridEmpty colSpan={1} message={someMessage} />
                </tbody>
            </table>,
        );

        // Icon
        expect(getByRole('presentation')).toBeInTheDocument();

        expect(getByText(someMessage)).toBeInTheDocument();
    });
});
