import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PagoCupon from '../pages/PagoCupon';
import App from '../App';
import MisCuponesComprados from '../pages/MisCuponesComprados';

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/pago-cupon" element={<PagoCupon />} />
				<Route path="/mis-cupones-comprados" element={<MisCuponesComprados />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
