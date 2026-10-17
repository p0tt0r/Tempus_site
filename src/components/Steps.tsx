export default function Steps({ className }: { className?: string }) {
  return (
    <div className={className ? `steps ${className}` : 'steps'} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
