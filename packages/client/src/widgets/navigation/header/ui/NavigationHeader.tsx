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
    {
        title: 'Circuits',
        link: '/circuits',
    },
    {
        title: 'Constructors',
        link: '/constructors',
    },
    {
        title: 'Seasons',
        link: '/seasons',
    },
];

export function NavigationHeader() {
    return (
        <nav
            className={
                'fixed left-0 right-0 top-0 flex h-20 w-full items-center px-10 dark:border-b-2 dark:border-b-slate-700 dark:bg-slate-950'
            }
        >
            {HeaderItems.map((item) => (
                <Link href={item.link} className={'mx-5'} key={`header_nav_${item.title}`}>
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
