import React, { useState, useEffect } from 'react';
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb';
import SkeletonLoader from './skeleton/SkeletonLoader';
import './FormPage.css';

interface FormPageProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  className?: string;
}

export default function FormPage({
  title,
  description,
  breadcrumbs,
  children,
  headerAction,
  className = '',
}: FormPageProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`form-page-wrapper ${className}`.trim()}>
      <div className="form-page-container">
        <Breadcrumb items={breadcrumbs} />

        <div className="form-page-header">
          <div>
            <h1 className="form-page-title">{title}</h1>
            {description && (
              <p className="form-page-description">{description}</p>
            )}
          </div>
          {headerAction && (
            <div className="form-page-action">{headerAction}</div>
          )}
        </div>

        <div className="form-page-content">
          {loading ? <SkeletonLoader type="grid" /> : children}
        </div>
      </div>
    </div>
  );
}
