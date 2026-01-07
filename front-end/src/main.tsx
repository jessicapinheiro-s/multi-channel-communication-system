import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const ambiente = import.meta.env.VITE_AMBIENTE_API;
const queryClient = new QueryClient();

/*
queryClient.prefetchQuery({
  queryKey: ['total_warnings'],
  queryFn: async () => {
    const response = await fetch(`${ambiente}/users/get-all`);
    const total = await response.json();
    return total.length;
  }
});
queryClient.prefetchQuery({
  queryKey: ['receptors_registered'],
  queryFn: async () => {
    const response = await fetch(`${ambiente}/warnings/get-all`);
    const total = await response.json();
    return total.length;
  }
});
queryClient.prefetchQuery({
  queryKey: ['total_warnings_email'],
  queryFn: async () => {
    const response = await fetch(`${ambiente}/warnings/get-all`);
    const total = await response.json();
    return total.length;
  }
});
queryClient.prefetchQuery({
  queryKey: ['total_warnings_meessages'],
  queryFn: async () => {
    const response = await fetch(`${ambiente}/warnings/get-all`);
    const total = await response.json();
    return total.length;
  }
});
queryClient.prefetchQuery({
  queryKey: ['total_warnings_logs'],
  queryFn: async () => {
    const response = await fetch(`${ambiente}/warnings_logs/get-all`);
    const total = await response.json();
    return total.length;
  }
});
*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
