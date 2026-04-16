const STATUS_LABELS = {
  pending_approval: "Pendiente",
  approved: "Activa",
  active: "Activa",
  approved_future: "Aprobada futura",
  past: "Pasada",
  finished: "Finalizada",
  rejected: "Rechazada",
  discarded: "Descartada",
};

const STATUS_BADGE_CLASSES = {
  pending_approval: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  active: "bg-green-100 text-green-800",
  approved_future: "bg-cyan-100 text-cyan-800",
  past: "bg-slate-200 text-slate-700 border border-slate-300",
  finished: "bg-slate-200 text-slate-700 border border-slate-300",
  rejected: "bg-red-100 text-red-800",
  discarded: "bg-gray-100 text-gray-800",
};

export const getCompanyOfferComputedStatus = (offer) => {
  if (!offer || offer.status !== "approved") return offer?.status;

  const soldCount = offer.coupons?.length || 0;
  const isSoldOut = offer.coupon_limit && soldCount >= offer.coupon_limit;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const isExpired = offer.end_date < todayStr;

  return isSoldOut || isExpired ? "finished" : "approved";
};

export const getOfferStatusLabel = (status) => STATUS_LABELS[status] || "Sin estado";

export const getOfferStatusBadgeClass = (status) =>
  STATUS_BADGE_CLASSES[status] || "bg-gray-100 text-gray-800";
