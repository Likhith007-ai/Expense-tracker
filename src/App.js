import Body from "./Components/Home/Body";
import { SnackbarProvider } from 'notistack';


function App() {
  return (
    <div>
      <SnackbarProvider>
      <Body/>
      </SnackbarProvider>
    </div>
  );
}

export default App;