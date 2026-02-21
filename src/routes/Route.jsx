import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PagoCupon from '../pages/PagoCupon';
import App from '../App';
import MisCuponesComprados from '../pages/MisCuponesComprados';
import ProtectedRoute from './ProtectedRoute';
import LogIn from '../components/auth/LogIn';
import SignUp from '../components/auth/SignUp';

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LogIn />} />
				<Route path="/signup" element={<SignUp />} />

				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<App />} />
					<Route path="/pago-cupon" element={<PagoCupon />} />
					<Route path="/mis-cupones-comprados" element={<MisCuponesComprados />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
