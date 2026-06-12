import { Button } from '../buttons';
import './GridActionButtons.css';

interface GridActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function GridActionButtons({
  onView,
  onEdit,
  onDelete,
}: GridActionButtonsProps) {
  return (
    <div className="grid-action-buttons">
      {onView && (
        <Button
          icon="eye"
          variant="outlined"
          size="small"
          className="grid-action-button grid-action-button-view"
          onClick={onView}
        />
      )}

      {onEdit && (
        <Button
          icon="pencil"
          variant="outlined"
          size="small"
          className="grid-action-button grid-action-button-edit"
          onClick={onEdit}
        />
      )}

      {onDelete && (
        <Button
          icon="trash"
          variant="outlined"
          size="small"
          className="grid-action-button grid-action-button-delete"
          onClick={onDelete}
        />
      )}
    </div>
  );
}
