import { ApplicationList } from "./components/ApplicationList";
import { seedApplications } from "./data/seed";

function App() {
  return (
    <main>
      <h1>Applied</h1>
      <ApplicationList applications={seedApplications} />
    </main>
  );
}

export default App;