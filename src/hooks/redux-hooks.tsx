import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import type { RootStateType, AppDispatchType } from '~redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatchType = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export { useAppDispatch, useAppSelector };
