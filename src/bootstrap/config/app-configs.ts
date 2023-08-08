const appConfigs = {
  baseApis: {
    main: ENV.MAIN_URL,
  },
  routes: {
    vehicles: "vehicles",
  },
} as const;

export default appConfigs;
