import { Message } from 'primereact/message';
import './InputBlock.css';

type Orientation = 'vertical' | 'horizontal';

export default function InputBlock(
  props: React.PropsWithChildren<
    Controls.InputBlockProps & {
      orientation?: Orientation;
      className?: string;
    }
  >
) {
  const {
    label,
    subLabel,
    id,
    required,
    errorMessage,
    children,
    orientation = 'vertical',
  } = props;

  return (
    <div className={`input-block ${orientation}`}>
      {label ? (
        <label htmlFor={id}>
          <span className="label-text">
            {label}
            {subLabel ? <span className="sub-label">{subLabel}</span> : null}
          </span>
          {required ? <span className="required">*</span> : null}
        </label>
      ) : null}

      <div className={`input-wrapper${errorMessage ? ' has-error' : ''}`}>
        {children}
        {errorMessage ? (
          <div className="error-message-wrapper">
            <Message severity="error" text={errorMessage} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
