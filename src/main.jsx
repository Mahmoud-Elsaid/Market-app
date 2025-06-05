import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CounterContextProvider from './Context/CounterContext.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import  { Toaster } from 'react-hot-toast';

const qureyClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    
    <QueryClientProvider client={qureyClient}>

        <UserContextProvider>

            <CounterContextProvider>
                
                <CartContextProvider>

                        <App />
                        <Toaster />
                    
                </CartContextProvider>

            </CounterContextProvider>

        </UserContextProvider>

    </QueryClientProvider>
    

)
