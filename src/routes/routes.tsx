import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IRouteSetting } from "./routes.type";
import React, { Suspense } from "react";
import { AppLayout, Loading } from "../components";
import { lazy } from "react";
import { PagePath } from "constants/PagePath";
import { RouteRedirector } from "./components";

const routeSettings: IRouteSetting[] = [
  {
    component: lazy(() =>
      import("../pages/Home/Page__Home").then((module) => ({
        default: module.Page__Home,
      }))
    ),
    path: PagePath.HomePage,
    exact: true,
  },
  {
    component: lazy(() =>
      import("../pages/GameTracker/Page__GameTracker").then((module) => ({
        default: module.Page__GameTracker,
      }))
    ),
    path: PagePath.GameTracker,
    exact: true,
  },
];

export function RouteOutlet(): React.ReactElement {
  return (
    <RouteRedirector>
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Switch>
              {routeSettings.map(({ component, path, exact }, idx) => (
                <Route
                  key={idx}
                  component={component}
                  path={path}
                  exact={exact}
                />
              ))}
            </Switch>
          </BrowserRouter>
        </Suspense>
      </AppLayout>
    </RouteRedirector>
  );
}
