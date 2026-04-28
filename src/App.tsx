import Features from 'features';
import { Toast } from 'primereact/toast';
import { useEffect, useRef } from 'react';
import { ToastService } from 'services';

export default function App() {
  const toast = useRef<Toast>(null);

  useEffect(() => {
    ToastService.setToastRef(toast);
  }, []);

  return (
    <>
      <Toast ref={toast} className="white-toast" />
      <Features />
    </>
  );
}

