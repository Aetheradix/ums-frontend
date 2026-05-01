import React from 'react';
import './FormCard.css';

interface FormCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export default function FormCard({
  title,
  subtitle,
  children,
  className = '',
  headerAction,
}: FormCardProps) {
  return (
    <div className={`form-card ${className}`.trim()}>
      {/* Card Header */}
      {(title || headerAction) && (
        <div className="form-card-header">
          <div>
            {title && <h2 className="form-card-title">{title}</h2>}
            {subtitle && <p className="form-card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Card Body */}
      <div className="form-card-body">{children}</div>
    </div>
  );
}
