import { Component, View } from '../../core';
import { MainView } from '../../views/main/main.view';

export class FileExplorerComponent extends Component {
  public selector = 'file-explorer';
  public loading = false;

  public render(view: View, parent: any) {
    super.render(view, parent);
    super.return(this.listItems());
  }

  private listItems() {
    const map = {
      'local': () => this.table(this.getData().localFiles, (this.view as MainView)?.bucket?.localPath, 'local'),
      'remote': () => this.table(this.getData().remoteFiles, (this.view as MainView)?.bucket?.remotePath, 'remote'),
    };
    return map[this.getAttribute('id')]?.();
  }

  private getReadableFileSizeString(fileSizeInBytes) {
    let i = -1;
    const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

  private getItem(item, type) {
    return `<tr><td ${item.isDirectory ? `click="${type === 'local' ? `this.openLocalFolder('${item.Key}')` : `this.openRemoteFolder('${item.Key}');`}"` : ''}>
    <input class="form-check-input" type="checkbox" value="" id="${item.Key}"> 
    <i class="bi ${ item.isDirectory ? 'bi-folder' : 'bi-file-text'}"></i> ${item.Key}
    </td><td class="text-end">${this.getReadableFileSizeString(item.Size)}</td></tr>`;
  }

  private table(items, path, type) {
    let result = `
    <div class="form-row">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">${ type === 'local' ? 'file://' : 's3://' }</span>
      <input type="text" class="form-control" aria-describedby="basic-addon1" value="${path}">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Go</button>
    </div>
      <!--<input type="text" class="form-control col-12" value="${path}">-->
    </div>`;
    if (this.loading) {
      return result + `<div class="center-screen"><div class="spinner-border m-5" role="status">
      <span class="visually-hidden">Loading...</span>
    </div></div>`;
    }
    result += `
    <div style="width: 50%; position: absolute; overflow-y: auto; top: 6em; bottom: 12em;">
    <table class="table table-striped table-hover">
    <tbody>`;
    if (path?.length > 1) {
      result += `<tr><td click="${type === 'local' ? `this.openLocalFolder('..')` : `this.openRemoteFolder('..')`}"><input class="form-check-input" type="checkbox" value="" disabled> <i class="bi bi-folder"></i> ..</td><td>&nbsp;</td></tr>`;
    }
    [true, false].forEach((isDir) => {
      items.forEach((item) => {
        if (!!item?.isDirectory == isDir) {
          result += this.getItem(item, type);
        }
      });
    });
    return result.concat(`</tbody>
    </table></div>
  `);
  }

  private removeLastPath(path) {
    const parts = path.split('/');
    let newPath = '/';
    for (let i=1; i < parts.length -2; i++) {
      newPath += parts[i] + '/';
    }
    return newPath;
  }

  private openLocalFolder(folder: string) {
    if (folder === '..') {
      (this.view as MainView).bucket.localPath = this.removeLastPath((this.view as MainView).bucket.localPath);
    } else {
      (this.view as MainView).bucket.localPath = (this.view as MainView).bucket.localPath.concat(folder).concat('/');
    }
    this.view.emmit('reloadLocal');
  }
  private openRemoteFolder(folder: string) {
    if (folder === '..') {
      (this.view as MainView).bucket.remotePath = this.removeLastPath((this.view as MainView).bucket.remotePath);
    } else {
      const ap = (this.view as MainView).bucket.remotePath;
      const np = ap.concat(folder).concat('/');
      (this.view as MainView).bucket.remotePath = np;
    }
    this.view.emmit('reloadRemote');
  }
}
