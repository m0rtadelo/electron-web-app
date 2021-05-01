import { View } from "../../core";
import { Component } from "../../core";

export class TableDateComponent extends Component {
  public selector = "table-data";

  public render(view: View, parent: any, dataToUse?: string) {
    super.render(view, parent, dataToUse);
    const length = this.getData()?.length;
    const html = `
<div class="container-fluid">
<div class="card">
  <div class="card-header"><strong>Title</strong>
    <div style="float: right">
      <button click="this.addItem()" type="button" class="btn btn-primary">
        <i class="bi bi-plus"></i>
        Add...
      </button>
    </div>
  </div>
  <div class="card-body" style="padding: 0px;">
    ${ length ? 
    `<table class="table table-striped table-hover">
    <thead>
    <tr>${this.getHeader()}</tr>
    </thead>
    <tbody>${this.getTable()}</tbody>
    </table>` : 
    `<div class="text-center">No data</div>` }
  </div>
  <div class="card-footer text-center">${ length ? `table elements: ${length}` : '' }</div>
</div></div>
    `;
    this.return(html);
  }

  public addItem() {
    this.getData().push({'id': 1, 'name': 'potato'});
  }

  public getHeader() {
    let cache = '';
    Object.keys(this.getData()[0]).forEach(key => cache = cache.concat(`<th scope="col">${key}</th>`));
    return cache;
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
