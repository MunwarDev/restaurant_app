import ReactDOM from "react-dom/client";
import Pages from "./project_pages.js";
import { BillProvider } from './BillContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<BillProvider><Pages/></BillProvider>);