/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import type { StoreApi } from "zustand/vanilla";

export type StateValueOf<TStore> = TStore extends StoreApi<infer TState>
  ? TState
  : never;

/**
 * This code defines a function called  toStream  that converts a store's
 *  state into an observable stream.
 *
 * The function takes several parameters:
 * - Store  represents the store object that holds the application state.
 * - Selector  is an optional function that can be
 *      used to select a specific slice of the state to be emitted in the stream.
 *
 * - The  options  object allows you to customize the behavior of the stream.
 *    It has two properties:
 *    - equalityFn  is an optional function that determines whether two values
 *        are equal. It takes the previous and current values emitted in the
 *        stream and should return a boolean indicating equality. If not provided,
 *        the strict equality ( === ) operator is used.
 *    - fireImmediately  is a boolean flag that determines whether the initial
 *        state should be emitted immediately when subscribing to the stream.
 *        By default, it is set to  true .
 */
const toStream = <
  TStore extends StoreApi<any>,
  TState extends object = StateValueOf<TStore>,
  TSlice = TState,
>(
  store: TStore,
  selector?: (value: TState) => TSlice,
  {
    equalityFn,
    fireImmediately = true,
  }: {
    equalityFn?: (previous: TSlice, current: TSlice) => boolean;
    fireImmediately?: boolean;
  } = {},
): Observable<TSlice> => {
  const state$ = new Observable<TState>((subscriber) => {
    if (fireImmediately) {
      subscriber.next(store.getState());
    }
    const unsubscribe = store.subscribe((state) => subscriber.next(state));
    return () => unsubscribe();
  });

  const mapped$: Observable<TSlice> = selector
    ? state$.pipe(map((state) => selector(state)))
    : (state$ as unknown as Observable<TSlice>);

  const deduped$ =
    selector || equalityFn
      ? mapped$.pipe(
          distinctUntilChanged((previous, current) => {
            if (equalityFn) {
              return equalityFn(previous, current);
            }
            return previous === current;
          }),
        )
      : mapped$;

  return deduped$;
};

export default toStream;
