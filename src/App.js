import "./index.css";
import DashboardFeatureBlock from "./Components/feature/DashboardFeatureBlock";
import ErrorBoundary from "./Components/shared/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <DashboardFeatureBlock />
      </div>
    </ErrorBoundary>
  );
}

export default App;
