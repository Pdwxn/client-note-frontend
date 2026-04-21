export default function Badge({ type }: { type: string }) {
  const styles: any = {
    idea: "bg-blue-100 text-blue-600",
    meeting: "bg-green-100 text-green-600",
    call: "bg-yellow-100 text-yellow-600",
    contract: "bg-purple-100 text-purple-600",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full capitalize ${
        styles[type] || "bg-gray-100 text-gray-600"
      }`}
    >
      {type}
    </span>
  );
}
