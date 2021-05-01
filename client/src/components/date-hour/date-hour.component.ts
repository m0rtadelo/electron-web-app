import { View } from "../../core";
import { Component } from "../../core";

export class DateHourComponent extends Component {
  public selector = 'date-hour';

  public render(view: View, parent: any) {
    const date = new Date();
    super.render(view, parent);
    super.return(
      `<div class="text-center"
      MouseEnter="this.setAttribute('onMouse', 1);" 
      MouseLeave="this.setAttribute('onMouse', 0);"
      click="this.show()" 
      >
      <small 
      style="color: ${!+this.getAttribute('onMouse') ? '#333333' : this.getAttribute('color')}">
        ${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}
        (${date.getHours().toString().padStart(2, '0')}:
        ${date.getMinutes().toString().padStart(2, '0')}:
        ${date.getSeconds().toString().padStart(2, '0')})
      </small></div>`);
  }

  public show() {
    console.log('component click event', this);    
  }
}