import Link from 'next/link';

interface IHeaderItems {
    title: string;
    link: string;
}

const HeaderItems: IHeaderItems[] = [
    {
        title: 'Home',
        link: '/',
    },
    {
        title: 'Drivers',
        link: '/drivers',
    },
];

export function NavigationHeader() {
    return (
        <nav
            className={
                'fixed left-0 right-0 top-0 flex h-20 w-full items-center px-10 dark:bg-slate-950'
            }
        >
            {HeaderItems.map((item) => (
                <Link href={item.link} className={'mx-5'}>
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
