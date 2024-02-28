import { CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <section className={'size-full fixed inset-2/4'}>
            <CircularProgress />
        </section>
    );
}
