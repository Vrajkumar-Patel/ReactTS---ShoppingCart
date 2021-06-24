import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'antd/dist/antd.css';
import { Toaster } from 'react-hot-toast';


const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <Toaster position='top-right'/>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);

