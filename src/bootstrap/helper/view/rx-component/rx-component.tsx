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
 * It Handles Components to show based on rxjs observable object
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
