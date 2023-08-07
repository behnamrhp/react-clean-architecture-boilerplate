import { useEffect, useState } from "react";
import Store from "../store/store-type";

type Selector<STATE, DATATYPE> = (state: STATE, prevState?: STATE) => DATATYPE;

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
