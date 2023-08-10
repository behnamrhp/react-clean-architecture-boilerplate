import "reflect-metadata";

vi.mock("~/bootstrap/config/app-configs.ts", () => ({
  default: {
    baseApis: {
      main: "main",
    },
  },
}));
