import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './FormPopup.css';

type FormPopupSize = 'default' | 'lg';

interface FormPopupProps {
  /** Whether the popup is visible */
  visible: boolean;
  /** Callback when the popup is closed */
  onHide: () => void;
  /** Title displayed in the popup header */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Content to render inside the popup */
  children: React.ReactNode;
  /** Size variant */
  size?: FormPopupSize;
}

export default function FormPopup({
  visible,
  onHide,
  title,
  subtitle,
  children,
  size = 'default',
}: FormPopupProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onHide();
    },
    [onHide]
  );

  useEffect(() => {
    if (!visible) return;
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  return createPortal(
    <div
      className="form-popup-overlay"
      onClick={onHide}
      id="form-popup-overlay"
    >
      <div
        className={`form-popup-panel ${size === 'lg' ? 'form-popup-lg' : ''}`.trim()}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        id="form-popup-panel"
      >
        {/* Header */}
        <div className="form-popup-header">
          <div className="form-popup-header-left">
            <h2 className="form-popup-title">{title}</h2>
            {subtitle && <p className="form-popup-subtitle">{subtitle}</p>}
          </div>
          <button
            className="form-popup-close"
            onClick={onHide}
            type="button"
            aria-label="Close"
            id="form-popup-close-btn"
          >
            <i className="pi pi-times" />
          </button>
        </div>

        {/* Body */}
        <div className="form-popup-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
