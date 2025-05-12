import type { Constructor } from '~entities/constructor';
import { ConstructorListCard } from '~entities/constructor';

interface IConstructorList {
    constructors: Constructor[];
}

export function ConstructorList({ constructors }: IConstructorList) {
    return (
        <div className={'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4'}>
            {constructors.map((constructor) => (
                <ConstructorListCard
                    key={`constructor_${constructor.id}`}
                    constructorEntity={constructor}
                />
            ))}
        </div>
    );
}
