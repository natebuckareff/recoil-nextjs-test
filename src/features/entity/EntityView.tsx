import { nanoid } from 'nanoid';
import React, { FC } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentEntityAtom, entityFilterAtom, entityListAtom } from './entity.state';
import { EntityEditor } from './EntityEditor';
import { EntityList } from './EntityList';

export const EntityView: FC = () => {
    const [currentEntity, setCurrentEntity] = useRecoilState(currentEntityAtom);
    const [entityFilter, setEntityFilter] = useRecoilState(entityFilterAtom);
    const setEntityList = useSetRecoilState(entityListAtom);

    const handleEntityClick = (id: string) => {
        setCurrentEntity(id);
    };

    const handleCreateClick = () => {
        const id = nanoid();
        setEntityList(x => [...x, id]);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === '') {
            setEntityFilter(null);
        } else {
            setEntityFilter(e.target.value);
        }
    };

    return (
        <>
            <button onClick={handleCreateClick}>Create</button>
            <input
                type="text"
                placeholder="Filter"
                value={entityFilter ?? ''}
                onChange={handleFilterChange}
            />
            <EntityList onClick={handleEntityClick} />
            {currentEntity && <EntityEditor id={currentEntity} />}
        </>
    );
};
