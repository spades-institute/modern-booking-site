export default function FadeDivider({ reverse = false, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[3px] w-full ${reverse ? "bg-fade-bar-rev" : "bg-fade-bar"} ${className}`}
    />
  );
}
