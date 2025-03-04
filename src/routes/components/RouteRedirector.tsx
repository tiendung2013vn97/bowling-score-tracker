import { PagePath } from "constants/PagePath";
import React, { useEffect } from "react";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";
import { GameStep } from "services/DataHandler__GameTracker/constants";

export function RouteRedirector({ children }: React.PropsWithChildren) {
  useEffect(() => {
    const pathname = window.location.pathname;

    const gameStep = gameTrackerHandler.getCurrentStep();
    if (
      gameStep === GameStep.InputPlayerInfo &&
      pathname !== PagePath.HomePage
    ) {
      window.location.href = PagePath.HomePage;
      return;
    }

    if (
      gameStep !== GameStep.InputPlayerInfo &&
      pathname !== PagePath.GameTracker
    ) {
      window.location.href = PagePath.GameTracker;
      return;
    }
  }, []);

  return <>{children}</>;
}
