import { View } from '../../core';
import { Component } from '../../core';
import { getDateString, getToday } from '../../core/utils/dates';

export class DateHourComponent extends Component {
  public selector = 'date-hour';

  public render(view: View, parent: any) {
    const date = getToday();
    super.render(view, parent);
    super.return(
        `<div class="text-center"
      MouseEnter="this.setAttribute('onMouse', 1);" 
      MouseLeave="this.setAttribute('onMouse', 0);"
      click="this.show()" 
      >
      <small 
      style="color: ${!+this.getAttribute('onMouse') ? '#CCCCCC' : this.getAttribute('color')}">
        ${getDateString(date)}
        (${date.getHours().toString().padStart(2, '0')}:
        ${date.getMinutes().toString().padStart(2, '0')}:
        ${date.getSeconds().toString().padStart(2, '0')})
      </small></div>`);
  }

  public show() {
    console.log('component click event', this);
  }
}
