import { Typography } from '~shared/ui/typography/Typography';

import type { SeasonType } from '~entities/season';

interface ISeasonInfoProps {
    season: SeasonType;
}

export function SeasonInfo({ season }: ISeasonInfoProps) {
    return (
        <>
            <Typography.Title level={1}>Season {season.year}</Typography.Title>
            <Typography.Paragraph>
                <a className={'link'} href={season.wiki_url} target={'_blank'}>
                    Wiki
                </a>
            </Typography.Paragraph>
        </>
    );
}
