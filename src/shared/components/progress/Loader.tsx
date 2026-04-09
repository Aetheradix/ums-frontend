// import { ProgressSpinner } from 'primereact/progressspinner';
import './Loader.css';
import PencilLoaderWithBookCap from './custom-loader/PencilLoader';

interface LoaderProps {
  type?: 'full' | 'relative' | 'inline';
  blur?: boolean;
}

export default function Loader({ type = 'full', blur = false }: LoaderProps) {
  return (
    <div
      className={`
        loader-container 
        loader-${type} 
        ${blur ? 'loader-blur' : ''}
      `}
    >
      <div className="loader-content fade-in">
        {/* <ProgressSpinner /> */}
        <PencilLoaderWithBookCap />
      </div>
    </div>
  );
}
