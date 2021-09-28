import { FileExplorerComponent } from '../../components';
import { MainView } from './main.view';

export class MainController {
  view: MainView;

  constructor(view?: MainView) {
    this.view = view;
  }

  public loadLocal(path?: string) {
    (this.view.getComponentById('local') as FileExplorerComponent).loading = true;
    this.view.bucket.localPath = path || this.view.bucket.localPath;
    this.view.model.localFiles = [];
    (window as any).api.sendMessage({ action: 'loadLocal', bucket: this.view.bucket });
  }

  public loadRemote(path?: string) {
    (this.view.getComponentById('remote') as FileExplorerComponent).loading = true;
    this.view.bucket.remotePath = path || this.view.bucket.remotePath;
    this.view.model.remoteFiles = [];
    this.view.model.remoteRaw = [];
    (window as any).api.sendMessage({ action: 'loadRemote', bucket: this.view.bucket });
  }
}
