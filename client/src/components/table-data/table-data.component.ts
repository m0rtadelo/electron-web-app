import { View } from "../../core";
import { Component } from "../../core";
import { AddModalView } from "./add-modal.view";
import { HomeView } from "../../views/home/home.view";

export class TableDateComponent extends Component {
  public selector = "table-data";
  public labelAdd: string; // = this.getAttribute('labelAdd');

  constructor() {
    super()
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
  <button click="this.addItem()" type="button" class="btn btn-primary">
    <i class="bi bi-plus"></i>
    ${ this.labelAdd }
  </button>
</div>`  : ''}  
  </div>
  <div class="card-body" style="padding: 0px;">
    ${ length ? 
    `<table class="table table-striped table-hover">
    <thead>
    <tr>${this.getHeader()}</tr>
    </thead>
    <tbody>${this.getTable()}</tbody>
    </table>` : 
    `<div class="text-center">${ this.view.loading ? '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>' : 'No data'}</div>` }
  </div>
  <div class="card-footer text-center">${ length ? `Elements: ${length}` : '' }</div>
</div></div>
    `;
    this.return(html);
  }

  public async addItem() {
    if (await this.view.openModal(new AddModalView(), 'test')) {
    //if (await this.view.confirm('sure?')) {
      this.getData().push({'id': 1, 'name': 'potato', admin: false});
    }
  }

  public getHeader() {
    let header = '';
    Object.keys(this.getData()[0]).forEach(key => { 
      header = header.concat(`<th scope="col" class="text-capitalize">${key}</th>`)
    });

    return header;
  }

  public getTable() {
    let table = '';
    this.getData().forEach((item: any) => {
      table = table.concat('<tr>');
      Object.keys(item).forEach((value: any) => {
        table = table.concat(`<td>${item[value]}</td>`);
      })
      table = table.concat('</tr>')
    });
    return table;
  }
}
