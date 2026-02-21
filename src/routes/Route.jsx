import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PagoCupon from '../pages/PagoCupon';
import App from '../App';

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/pago-cupon" element={<PagoCupon />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
