import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getEmployeesByCompany } from "../../services/employeesService";
import { getOfferFinancials } from "../../services/statsService";
import { getOfferStatusLabel } from "../../utils/offerStatus";

export default function DashboardPage() {
    const { profile } = useAuth();
    const [stats, setStats] = useState([]);
    const [totals, setTotals] = useState({
        income: 0,
        commission: 0,
        coupons: 0,
        employees: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile?.company_id) {
            loadStats();
        }
    }, [profile]);

    const loadStats = async () => {
        try {
            setLoading(true);
            const [financials, employees] = await Promise.all([
                getOfferFinancials(profile.company_id),
                getEmployeesByCompany(profile.company_id)
            ]);

            const data = financials || [];
            setStats(data);

            const income = data.reduce((acc, curr) => acc + (curr.total_revenue || 0), 0);
            const commission = data.reduce((acc, curr) => acc + (curr.service_charge || 0), 0);
            const coupons = data.reduce((acc, curr) => acc + (curr.coupons_sold || 0), 0);
            const employeesCount = (employees || []).length;

            setTotals({
                income,
                commission,
                coupons,
                employees: employeesCount,
            });
        } catch (error) {
            console.error("Error cargando estadísticas:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-slate-800">Panel de Empresa</h1>
            <p className="text-slate-600 mb-6">
                Resumen financiero de tus ofertas y estado operativo de tu empresa.
            </p>

            {loading ? (
                <div className="p-8 text-slate-500">Cargando métricas de tu empresa...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <p className="text-xs uppercase font-semibold text-slate-500">Ventas Totales</p>
                            <p className="text-3xl font-bold text-slate-900 mt-2">
                                ${totals.income.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </p>
                        </div>

                        <div className="p-5 bg-white border border-emerald-200 rounded-lg shadow-sm">
                            <p className="text-xs uppercase font-semibold text-emerald-700">Comisión Plataforma</p>
                            <p className="text-3xl font-bold text-emerald-600 mt-2">
                                ${totals.commission.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </p>
                        </div>

                        <div className="p-5 bg-white border border-blue-200 rounded-lg shadow-sm">
                            <p className="text-xs uppercase font-semibold text-blue-700">Cupones Vendidos</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">{totals.coupons}</p>
                        </div>

                        <div className="p-5 bg-white border border-violet-200 rounded-lg shadow-sm">
                            <p className="text-xs uppercase font-semibold text-violet-700">Empleados</p>
                            <p className="text-3xl font-bold text-violet-600 mt-2">{totals.employees}</p>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold mb-4 text-slate-700">Desglose por Oferta</h2>
                    <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Oferta</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Estado</th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase">Vendidos</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Ingresos</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-emerald-700 uppercase">Comisión</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {stats.map((item) => (
                                    <tr key={item.offer_id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 max-w-xs truncate" title={item.title}>
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {getOfferStatusLabel(item.display_category || item.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center font-bold text-slate-800">{item.coupons_sold}</td>
                                        <td className="px-6 py-4 text-sm text-right font-medium text-slate-900">
                                            ${item.total_revenue?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right font-bold text-emerald-600">
                                            ${item.service_charge?.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                {stats.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                                            No hay métricas de ofertas para tu empresa aún.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

