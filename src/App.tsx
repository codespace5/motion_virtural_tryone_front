import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import AppRouter from "router";
import { store } from "store";
import { theme } from "utils/theme";

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ConfigProvider>
  );
};

export default App;
