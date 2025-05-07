import { Typography } from '~shared/ui/typography/Typography';

import type { Constructor } from '~entities/constructor';

interface IConstructorInfoProps {
    constructor_entity: Constructor;
}

export function ConstructorInfo({ constructor_entity }: IConstructorInfoProps) {
    return (
        <>
            <Typography.Title level={1}>{constructor_entity.name}</Typography.Title>
            <Typography.Paragraph>
                <a
                    className={'link'}
                    href={constructor_entity.wiki_url}
                    target={'_blank'}
                    rel={'noopener'}
                >
                    Wiki
                </a>
            </Typography.Paragraph>
            <Typography.Paragraph>
                Nationality: {constructor_entity.nationality}
            </Typography.Paragraph>
        </>
    );
}
