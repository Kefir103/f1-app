import { ReactNode } from 'react';
import { cn } from '~shadcn/utils';

interface ITypographyProps {
    children?: ReactNode;
    className?: string;
}

function TypographyH1({ children, className }: ITypographyProps) {
    return (
        <h1
            className={cn(
                'scroll-m-20 mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl',
                className,
            )}
        >
            {children}
        </h1>
    );
}

function TypographyH2({ children, className }: ITypographyProps) {
    return (
        <h2
            className={cn(
                'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
                className,
            )}
        >
            {children}
        </h2>
    );
}

function TypographyH3({ children, className }: ITypographyProps) {
    return (
        <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
            {children}
        </h3>
    );
}

function TypographyH4({ children, className }: ITypographyProps) {
    return (
        <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>
            {children}
        </h4>
    );
}

enum TypographyTitleLevels {
    'h1' = 1,
    'h2' = 2,
    'h3' = 3,
    'h4' = 4,
}

export function TypographyTitle({
    level = TypographyTitleLevels.h1,
    className,
    children,
}: ITypographyProps & {
    level?: TypographyTitleLevels;
}) {
    let TypographyComponent;

    switch (level) {
        case TypographyTitleLevels.h1: {
            TypographyComponent = TypographyH1;
            break;
        }
        case TypographyTitleLevels.h2: {
            TypographyComponent = TypographyH2;
            break;
        }
        case TypographyTitleLevels.h3: {
            TypographyComponent = TypographyH3;
            break;
        }
        case TypographyTitleLevels.h4: {
            TypographyComponent = TypographyH4;
            break;
        }
        default: {
            TypographyComponent = TypographyH1;
            break;
        }
    }

    return <TypographyComponent className={cn(className)}>{children}</TypographyComponent>;
}

export function TypographyParagraph({ children, className }: ITypographyProps) {
    return <p className={cn('leading-7 mb-2', className)}>{children}</p>;
}

export function Typography({ children, className }: ITypographyProps) {
    return <div className={cn('font-sans text-base', className)}>{children}</div>;
}

Typography.Title = TypographyTitle;
Typography.Paragraph = TypographyParagraph;
