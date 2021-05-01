import { View } from "../../core";
import { Component } from "../../core";

export class TableDateComponent extends Component {
  public selector = "table-data";

  public render(view: View, parent: any, dataToUse?: string) {
    super.render(view, parent, dataToUse);
    const html = `table elements: ${this.getData()?.length}`;
    this.return(html);
  }
}
