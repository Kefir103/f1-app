import NextLink from 'next/link';
import { Card, CardHeader, CardContent, CardTitle } from '~shadcn/ui/card';

import { Typography } from '~shared/ui/typography/Typography';

import type { SeasonType } from '~entities/season';

interface ISeasonListCard {
    season: SeasonType;
}

export function SeasonListCard({ season }: ISeasonListCard) {
    return (
        <Card className={'card'}>
            <CardHeader>
                <CardTitle>
                    <Typography.Title level={3}>
                        <NextLink
                            href={`/seasons/${season.year}`}
                            className={'link-white'}
                            title={`Season ${season.year}`}
                        >
                            Season {season.year}
                        </NextLink>
                    </Typography.Title>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <a className={'link'} href={season.wiki_url} target={'_blank'}>
                    Wiki
                </a>
            </CardContent>
        </Card>
    );
}
