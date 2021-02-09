import { atom, atomFamily, selector } from 'recoil';
import { Entity } from './entity.type';

export const entityAtom = atomFamily<Entity, string>({
    key: 'entity',
    default: {
        name: '',
        value: 0,
    },
});

export const entityListAtom = atom<string[]>({
    key: 'entity-list',
    default: [],
});

export const entityFilterAtom = atom<string | null>({
    key: 'entity-filter',
    default: null,
});

export const entityFilteredListSelector = selector<string[]>({
    key: 'entity-filtered-list',
    get: ({ get }) => {
        const filter = get(entityFilterAtom);
        const list = get(entityListAtom);
        if (filter === null) {
            return list;
        } else {
            return list.filter(id => {
                const entity = get(entityAtom(id));
                return entity.name.startsWith(filter);
            });
        }
    },
});

export const currentEntityAtom = atom<string | null>({
    key: 'current-entity',
    default: null,
});
