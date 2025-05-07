'use client';

import { Bars } from 'react-loader-spinner';

export default function Loading() {
    return (
        <section className={'fixed inset-2/4 size-full'}>
            <Bars height={72} width={72} color={'currentColor'} />
        </section>
    );
}
