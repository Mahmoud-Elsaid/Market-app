
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx';
import 'jquery/dist/jquery.min.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-multi-carousel/lib/styles.css';
import CounterContextProvider from './Contexst/CounterContext.jsx';
import UserContextProvider from './Contexst/UserContext.jsx';
import CartContextProvider from './Contexst/Addtocartcontext.jsx';
import  { Toaster } from 'react-hot-toast';

let queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <CartContextProvider>
                    <CounterContextProvider>
                        <App />
                    </CounterContextProvider>
                    <Toaster />
                </CartContextProvider>
            </UserContextProvider>
            
        </QueryClientProvider>
        
        
);