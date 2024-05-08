import NextLink from 'next/link';
import { Card, CardContent, CardHeader, Link } from '@mui/material';

import type { Season } from '~entities/season/type';

interface ISeasonListCard {
    season: Season;
}

export function SeasonListCard({ season }: ISeasonListCard) {
    return (
        <Card className={'card'}>
            <CardContent>
                <CardHeader
                    title={
                        <NextLink
                            href={`/seasons/${season.year}`}
                            className={'link'}
                            title={`Season ${season.year}`}
                        >
                            Season {season.year}
                        </NextLink>
                    }
                />
                <Link className={'link'} href={season.wiki_url} target={'_blank'}>
                    Wiki
                </Link>
            </CardContent>
        </Card>
    );
}
