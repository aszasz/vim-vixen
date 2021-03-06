import { injectable } from 'tsyringe';

const NOTIFICATION_ID_UPDATE = 'vimvixen-update';
const NOTIFICATION_ID_INVALID_SETTINGS = 'vimvixen-update-invalid-settings';

@injectable()
export default class NotifyPresenter {
  async notifyUpdated(version: string, onclick: () => void): Promise<void> {
    const title = `Vim Vixen ${version} has been installed`;
    const message = 'Click here to see release notes';

    const listener = (id: string) => {
      if (id !== NOTIFICATION_ID_UPDATE) {
        return;
      }
      onclick();
      browser.notifications.onClicked.removeListener(listener);
    };
    browser.notifications.onClicked.addListener(listener);

    await browser.notifications.create(NOTIFICATION_ID_UPDATE, {
      'type': 'basic',
      'iconUrl': browser.extension.getURL('resources/icon_48x48.png'),
      title,
      message,
    });
  }

  async notifyInvalidSettings(onclick: () => void): Promise<void> {
    const title = `Loaded settings is invalid`;
    // eslint-disable-next-line max-len
    const message = 'The default settings is used due to the last saved settings is invalid.  Check your current settings from the add-on preference';

    const listener = (id: string) => {
      if (id !== NOTIFICATION_ID_INVALID_SETTINGS) {
        return;
      }
      onclick();
      browser.notifications.onClicked.removeListener(listener);
    };
    browser.notifications.onClicked.addListener(listener);

    await browser.notifications.create(NOTIFICATION_ID_INVALID_SETTINGS, {
      'type': 'basic',
      'iconUrl': browser.extension.getURL('resources/icon_48x48.png'),
      title,
      message,
    });
  }
}
