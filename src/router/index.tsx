import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RoutesConfig } from "config";
import { IRoute } from "utils/types";

import AppLayout from "layout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {RoutesConfig.map((route: IRoute, index: number) => (
          <Route
            key={index}
            path={route.path}
            element={
              <AppLayout>
                <>{route.component}</>
              </AppLayout>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
