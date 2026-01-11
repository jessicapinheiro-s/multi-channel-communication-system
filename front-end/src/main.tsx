import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getTotalEmails, getTotalMessages, getTotalReceptors, getTotalWarningLogs, getTotalWarnings } from './repository'

const queryClient = new QueryClient();

queryClient.prefetchQuery({
  queryKey: ["receptors_registered"],
  queryFn: async () => {
    return await getTotalReceptors();
  },
});

queryClient.prefetchQuery({
  queryKey: ["total_warnings"],
  queryFn: async () => {
    return await getTotalWarnings();
  },
});


queryClient.prefetchQuery({
  queryKey: ["total_warnings_email"],
  queryFn: async () => {
    return await getTotalEmails()
  },
});

queryClient.prefetchQuery({
  queryKey: ["total_warnings_meessages"],
  queryFn: async () => {
    return await getTotalMessages();
  },
});

queryClient.prefetchQuery({
  queryKey: ["total_warnings_logs"],
  queryFn: async () => {
    return await getTotalWarningLogs();
  },
});



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
