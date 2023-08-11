import "reflect-metadata";

/* -------------------------------------------------------------------------- */
/*                             Mocking App Configs                            */
/* -------------------------------------------------------------------------- */
vi.mock("~/bootstrap/config/app-configs.ts", () => ({
  default: {
    baseApis: {
      main: "main",
    },
  },
}));

/* -------------------------------------------------------------------------- */
/*                                Mocking I18N                                */
/* -------------------------------------------------------------------------- */
vitest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      dir: () => "mocked",
      changeLanguage: () =>
        new Promise(() => {
          "mocked function";
        }),
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => null,
  },
}));
