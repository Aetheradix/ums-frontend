import { confirmDialog } from 'primereact/confirmdialog';

export function confirm(
  message: string,
  header: string = 'Confirmation'
): Promise<boolean> {
  return new Promise(resolve => {
    confirmDialog({
      message,
      header,
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => resolve(true),
      reject: () => resolve(false),
      onHide: () => resolve(false),
    });
  });
}

export default { confirm };
