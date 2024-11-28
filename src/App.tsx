import Provider from './providers';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
