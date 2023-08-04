import { StateCreator } from "zustand";
import { fromEventPattern } from "rxjs";
import type { Observable } from "rxjs";
/* -------------------------------------------------------------------------- */
type InferState<
  TStore extends {
    getState: StateCreator<object>;
  },
> = TStore extends {
  getState: StateCreator<infer TState>;
}
  ? TState
  : never;

/* -------------------------------------------------------------------------- */
/**
 * Creates a zustand selector as an RxJS observable
 */
const toStream = <
  TStore extends {
    getState: StateCreator<object>;
  },
  TStateSlice,
  TState extends object = InferState<TStore>,
>(
  store: TStore,
  selector: (s: TState) => TStateSlice,
  options?: {
    equalityFn?: (a: TStateSlice, b: TStateSlice) => boolean;
    fireImmediately?: boolean;
  },
): Observable<TStateSlice> => {
  const result = fromEventPattern<TStateSlice>(
    (handler) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (store as any).subscribe(
        selector,
        (value: unknown) => {
          handler(value);
        },
        options,
      ),
    (_handler, signal) => signal(),
  );

  return result;
};
/* -------------------------------------------------------------------------- */
export default toStream;
