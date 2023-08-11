const appConfigs = {
  baseApis: {
    main: typeof ENV !== "undefined" ? ENV.MAIN_URL : null,
  },
  routes: {
    vehicles: "vehicles",
  },
} as const;

export default appConfigs;
