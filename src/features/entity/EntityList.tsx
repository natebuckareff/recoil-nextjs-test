import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { currentEntityAtom, entityFilteredListSelector } from './entity.state';
import { EntityListItem } from './EntityListItem';

export interface EntityList {
    onClick: (id: string) => void;
}

export const EntityList: FC<EntityList> = props => {
    const entityFilteredList = useRecoilValue(entityFilteredListSelector);
    const currentEntity = useRecoilValue(currentEntityAtom);

    if (entityFilteredList.length === 0) {
        return <pre>(empty)</pre>;
    }

    return (
        <div>
            <div>
                {entityFilteredList.map(id => (
                    <pre key={id} onClick={() => props.onClick(id)}>
                        <EntityListItem id={id} selected={id === currentEntity} />
                    </pre>
                ))}
            </div>
        </div>
    );
};
