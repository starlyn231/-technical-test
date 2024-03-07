/* eslint-disable */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import CrediCardView from './view/home/credit-card'

function App() {
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <CrediCardView />
    </QueryClientProvider>


  )
}

export default App
