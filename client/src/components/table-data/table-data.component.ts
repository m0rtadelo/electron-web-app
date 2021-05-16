import { View } from '../../core';
import { Component } from '../../core';
import { exportExcel } from '../../core/utils/export';

export class TableDateComponent extends Component {
  public selector = 'table-data';
  public labelAdd: string;
  private headers: string[];

  constructor() {
    super();
  }

  public render(view: View, parent: any, dataToUse?: string) {
    super.render(view, parent, dataToUse);
    this.labelAdd = this.labelAdd || this.getAttribute('labelAdd');
    const length = this.getData()?.length;
    const html = `
<div class="container-fluid">
<div class="card">
  <div class="card-header"><strong class="text-capitalize">${dataToUse}</strong>
  ${ this.labelAdd ? `<div style="float: right">
  <button click="this.export()" type="button" class="btn btn-secondary btn-sm">
  <i class="bi bi-download"></i>
  Export</button>
  <button click="this.addItem()" type="button" class="btn btn-primary btn-sm">
    <i class="bi bi-plus"></i>
    ${ this.labelAdd }
  </button>
</div>` : ''}  
  </div>
  <div class="card-body" style="padding: 0px;">
    ${ length ?
    `<table class="table table-striped table-hover">
    <thead>
    <tr>${this.getHeader()}</tr>
    </thead>
    <tbody>${this.getTable()}</tbody>
    </table>` :
    `<div class="text-center">${ this.view.loading ?
    `<div class="text-center">
    <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span>
    </div></div>` : 'No data'}</div>` }
  </div>
  <div class="card-footer text-center">${ length ? `Elements: ${length}` : '' }</div>
</div></div>
    `;
    this.return(html);
  }

  public async addItem() {
    this.view.emmit({ action: 'add', idComponent: this.idComponent });
    // TODO: AUTO
    // if (await this.view.openModal(new AddModalView(), 'test')) {
    //   this.getData().push({'id': 1, 'name': 'potato', admin: false});
    // }
  }

  public getHeader() {
    this.headers = Object.keys(this.getData()[0]);
    let header = '';
    this.headers.forEach((key) => {
      header = header.concat(`<th scope="col" class="text-capitalize">${key}</th>`);
    });

    return header.concat(`<th scope="col" style="text-align: right;">Actions</th>`);
  }

  public getTable() {
    let table = '';
    this.getData().forEach((item: any) => {
      table = table.concat('<tr>');
      this.headers.forEach((value: any) => {
        table = table.concat(`<td>${item[value]}</td>`);
      });
      const bitem = window.btoa(JSON.stringify(item));
      table = table.concat(`
      <td style="text-align: right;"><a href="#" title="Edit" click="this.edit('${bitem}')"><i class="bi bi-pencil" style="margin: 0.5em;"></i></a>
      <a href="#" title="Delete" click="this.delete('${bitem}');"><i class="bi bi-trash" style="margin: 0.5em;"></i></a></td>`);
      table = table.concat('</tr>');
    });
    return table;
  }

  public export() {
    exportExcel([...this.getData()]);
  }

  public async delete(bitem) {
    const item = JSON.parse(window.atob(bitem));
    if (await this.view.confirm('Are you sure you want to delete a item?', 'Delete')) {
      this.view.emmit({ action: 'delete', idComponent: this.idComponent, item });
    }
  }

  public async edit(bitem) {
    const item = JSON.parse(window.atob(bitem));
    this.view.emmit({ action: 'edit', idComponent: this.idComponent, item });
  }
}
