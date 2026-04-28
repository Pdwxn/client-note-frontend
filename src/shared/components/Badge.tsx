export default function Badge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    idea: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    meeting: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    call: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
    contract: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  };

  const fallbackStyle = "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]";

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full capitalize ${
        styles[type] || fallbackStyle
      }`}
    >
      {type}
    </span>
  );
}
