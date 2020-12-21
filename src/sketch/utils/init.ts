import { getSelectedDocument } from 'sketch/dom';
import {
  updateWindowsMoveSelectorId,
  updateWindowsMoveInstanceId,
} from '@/identifier';

export default function () {
  const id = getSelectedDocument().id;

  updateWindowsMoveInstanceId(`window-move-instance-${id}`);
  updateWindowsMoveSelectorId(`window-move-selector-${id}`);
}
