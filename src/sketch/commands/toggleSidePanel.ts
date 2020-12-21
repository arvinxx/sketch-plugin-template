import { getSettings } from '@/utils';
import { identifier } from '@/identifier';

export const toggleSidePanel = (context: SketchContext) => {
  const SidePanelIdentifier = `${identifier}-side-panel`;

  const isShow = getSettings(SidePanelIdentifier);

  if (isShow) {
    const toggleSidePanelCommand = context.command.pluginBundle().commands()[
      `${identifier}.toggle-side-panel`
    ];

    context.command = toggleSidePanelCommand;

    AppController.sharedInstance().runPluginCommand_fromMenu_context(
      toggleSidePanelCommand,
      false,
      context
    );
  }
};
