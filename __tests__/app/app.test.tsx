import { render } from "@testing-library/react-native";
import App from "../../src/app/index";

describe("App Smoke Test", () => {
  it("deve renderizar o aplicativo corretamente", () => {
    render(<App />)
      .then((data) => {
        expect(data.toJSON()).toBeTruthy();
      })
      .catch((error) => {
        throw error;
      });
  });
});
