import type { ReactNode } from 'react';

type StatusMessageProps = {
  children: ReactNode;
  variant?: 'info' | 'error';
};

export default function StatusMessage({ children, variant = 'info' }: StatusMessageProps) {
  const isError = variant === 'error';

  return (
    <p
      className={isError ? 'status-message status-message--error' : 'status-message'}
      role={isError ? 'alert' : 'status'}
    >
      {children}
    </p>
  );
}
