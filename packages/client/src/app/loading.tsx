import { CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <section className={'fixed inset-2/4 size-full'}>
            <CircularProgress />
        </section>
    );
}
