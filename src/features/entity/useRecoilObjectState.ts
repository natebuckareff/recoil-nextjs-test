import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

export interface RecoilObjectStateHook<T> {
    // original state from recoil atom
    original: T;

    // current (local) mutated state
    draft: T;

    // updates local state
    update: Dispatch<SetStateAction<T>>;

    // updates specific property in local state
    set: <K extends keyof T>(field: K, value: T[K]) => void;

    // saves `draft` to `original`
    save: () => void;

    // clears `draft` and sets it to `original`
    cancel: () => void;
}

export function useRecoilObjectState<T>(atom: RecoilState<T>): RecoilObjectStateHook<T> {
    const [original, setOriginal] = useRecoilState(atom);
    const [draft, setDraft] = useState(original);

    useEffect(() => {
        setDraft(original);
    }, [original]);

    const save = useCallback(() => setOriginal(draft), [setOriginal, draft]);
    const cancel = useCallback(() => setDraft(original), [setDraft, original]);

    const set = <K extends keyof T>(field: K, value: T[K]) => {
        setDraft(x => ({ ...x, [field]: value }));
    };

    return {
        original,
        draft,
        update: setDraft,
        set,
        save,
        cancel,
    };
}
