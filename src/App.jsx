import "./App.css";
import routes from "./routes";

const App = () => <>{routes[window.location.hash] ?? routes.default}</>;

export default App;
