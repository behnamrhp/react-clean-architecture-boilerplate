import { useEffect, useState } from "react";
import Store from "../store/store-type";

type Selector<STATE, DATATYPE> = (state: STATE, prevState?: STATE) => DATATYPE;

/**
 * this hook allows React hooks to subscribe to changes in
 *  store and access selected data from it.
 * @param store store object.
 * @param selector This is a function that takes the current
 *  state and previous state as arguments and returns the
 *  selected data from the state.
 * @param initial This is the initial value for the selected data.
 */
export default function useStoreSelector<STATE, DATATYPE>(
  store: Store<STATE>,
  selector: Selector<STATE, DATATYPE>,
  initial: DATATYPE,
) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    const unsubscriber = store.subscribe((state, prevState) => {
      const newData = selector(state, prevState);
      setData(newData);
    });

    return () => unsubscriber();
  }, []);

  return data;
}
