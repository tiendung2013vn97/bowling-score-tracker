import "./App.css";
import { RouteOutlet } from "./routes/routes";
import { GlobalTheme } from "components/GlobalTheme";
import ErrorBoundary from "components/ErrorBoundary";

function App() {
  return (
    <>
      <GlobalTheme>
        <ErrorBoundary>
          <RouteOutlet />
        </ErrorBoundary>
      </GlobalTheme>
    </>
  );
}

export default App;
