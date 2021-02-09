import React, { CSSProperties, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { entityAtom } from './entity.state';

export interface EntityListItem {
    id: string;
    selected?: boolean;
}

export const EntityListItem = React.memo<EntityListItem>(props => {
    const entity = useRecoilValue(entityAtom(props.id));

    const style = useMemo<CSSProperties>(
        () => ({
            color: props.selected ? 'red' : 'black',
        }),
        [props.selected],
    );

    return (
        <div style={style}>
            {entity.name || 'noname'} ({props.id})
        </div>
    );
});
