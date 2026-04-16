const styleByType = {
  success: "bg-green-100 text-green-700 border-green-200",
  error: "bg-red-100 text-red-700 border-red-200",
  info: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function FeedbackMessage({ type = "info", message }) {
  if (!message) return null;
  return <div className={`border p-3 mb-4 rounded ${styleByType[type] || styleByType.info}`}>{message}</div>;
}