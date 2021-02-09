import { FC } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { currentEntityAtom, entityAtom, entityListAtom } from './entity.state';
import { useRecoilObjectState } from './useRecoilObjectState';

export interface EntityEditor {
    id: string;
}

export const EntityEditor: FC<EntityEditor> = props => {
    const entityEditor = useRecoilObjectState(entityAtom(props.id));
    const resetEntity = useResetRecoilState(entityAtom(props.id));
    const setCurrentEntity = useSetRecoilState(currentEntityAtom);
    const setEntityList = useSetRecoilState(entityListAtom);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        entityEditor.set('name', e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        entityEditor.set('value', Number.parseInt(e.target.value));
    };

    const handleSaveClick = () => {
        entityEditor.save();
    };

    const handleCloseClick = () => {
        entityEditor.cancel();
        setCurrentEntity(null);
    };

    const handleDeleteClick = () => {
        resetEntity();
        setEntityList(ids => ids.filter(x => x !== props.id));
        setCurrentEntity(null);
    };

    const hasChanges = entityEditor.original !== entityEditor.draft;

    return (
        <div style={{ border: '1px solid red', marginBottom: '1rem', padding: '0.5rem' }}>
            <pre>id: {props.id}</pre>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={entityEditor.draft.name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Value"
                    value={entityEditor.draft.value}
                    onChange={handleValueChange}
                />
            </div>
            <button disabled={!hasChanges} onClick={handleSaveClick}>
                Save
            </button>
            <button onClick={handleCloseClick}>Cancel</button>
            <button style={{ color: 'red' }} onClick={handleDeleteClick}>
                Delete
            </button>
        </div>
    );
};
