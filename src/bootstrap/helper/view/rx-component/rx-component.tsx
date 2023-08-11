import { useSubscription } from "observable-hooks";
import React, { FC, useEffect, useState } from "react";
import { Observable } from "rxjs";
import rxComponents from "./rxComponentsEnum";

interface IRXComponent<T> {
  observable$: Observable<T>;
  loadingPattern?: (data: T | undefined) => boolean;
  errorPattern?: (data: T | undefined) => boolean;
  LoadingComponent?: FC;
  ErrorComponent?(): JSX.Element;
  NextComponent: FC<{ data: T }>;
  CompleteComponent?: FC;
}

/**
 * Handles rendering different components based on the state of
 *  an observable stream.
 *
 * Props:
 * - LoadingComponent: Component to render when the observable is loading.
 * - NextComponent: Component to render when the observable emits a new value.
 * - observable$: The observable stream.
 * - ErrorComponent: Component to render when there is an error with the observable.
 * - CompleteComponent: Component to render when the observable completes.
 * - loadingPattern: Function to determine if the observable is still loading.
 * - errorPattern: Function to determine if there is an error with the observable.
 */
export default function RXComponent<DATATYPE>(props: IRXComponent<DATATYPE>) {
  const {
    LoadingComponent,
    NextComponent,
    observable$,
    ErrorComponent,
    CompleteComponent,
    loadingPattern,
    errorPattern,
  } = props;
  /* ---------------------------------- State --------------------------------- */
  const [currentWidget, setCurrentWidget] = useState<rxComponents>(
    rxComponents.LOADING,
  );
  const [data, setData] = useState<DATATYPE | undefined>();
  /* ------------------------------ subscription ------------------------------ */
  useSubscription(observable$, {
    next: (data: DATATYPE) => {
      setData(data);
      setCurrentWidget(rxComponents.NEXT);
    },
    complete() {
      if (!CompleteComponent) return;
      setCurrentWidget(rxComponents.COMPLETE);
    },
    error() {
      if (!ErrorComponent) return;
      setCurrentWidget(rxComponents.ERROR);
    },
  });
  /* ------------------------------- SideEffect ------------------------------- */
  /**
   * Checks if there is an error based on the errorPattern and updates the
   *  currentWidget accordingly.
   */
  const useErrorSideEffect = () => {
    useEffect(() => {
      if (!errorPattern) return;
      const isError = errorPattern(data);

      if (isError) {
        setCurrentWidget(rxComponents.ERROR);
      }
    }, [data]);
  };
  useErrorSideEffect();
  /* -------------------------------------------------------------------------- */
  /**
   * Checks if the observable is still loading based on the loadingPattern and
   *  updates the currentWidget accordingly.
   */
  const useLoadingSideEffect = () => {
    useEffect(() => {
      if (!loadingPattern || !LoadingComponent) return;
      const isLoading = loadingPattern(data);

      if (isLoading) {
        setCurrentWidget(rxComponents.LOADING);
      }
    }, [data]);
  };
  useLoadingSideEffect();

  /* -------------------------------------------------------------------------- */
  const isLoadingPattern =
    (loadingPattern && loadingPattern(data)) || !loadingPattern;
  /* ---------------------------------- Build --------------------------------- */
  if (
    LoadingComponent &&
    currentWidget === rxComponents.LOADING &&
    isLoadingPattern
  )
    return <LoadingComponent />;

  if (currentWidget === rxComponents.NEXT && data)
    return <NextComponent data={data} />;

  if (currentWidget === rxComponents.COMPLETE && CompleteComponent)
    return <CompleteComponent />;

  if (currentWidget === rxComponents.ERROR && ErrorComponent)
    return <ErrorComponent />;
  /* -------------------------------------------------------------------------- */
}
