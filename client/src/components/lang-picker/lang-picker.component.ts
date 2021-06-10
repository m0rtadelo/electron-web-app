import { Component, View } from '../../core';
import { i18 } from '../../core/services/i18';

export class LangpickerComponent extends Component {
  public selector = 'lang-picker';

  public render(view: View, parent: any) {
    super.render(view, parent);
    super.return(`
    <style>
    lang-picker div div {
      color: #EEEEEE;
      width: 2em;
      height: 2em;
      text-transform: uppercase;
      font-weight: bold;
      margin: 1em 1em 0em 0em;
      cursor: pointer;
      text-align: center;
    }
    lang-picker div div:hover {
      color: #AAAAAA;  
      cursor: pointer;
    }
    lang-picker .selected {
      background-color: #DDDDDD;
    }
    </style>
    <div style="display: flex; right: 0; top:0; position: absolute;">
      <div click="this.changeLang('en')" class="${i18.lang === 'en' ? 'selected' : ''}">EN</div> 
      <div click="this.changeLang('es')" class="${i18.lang === 'es' ? 'selected' : ''}">ES</div>
      <div click="this.changeLang('cat')" class="${i18.lang === 'cat' ? 'selected' : ''}">CAT</div>
    </div>
    `);
  }

  public changeLang(lang: string) {
    i18.lang = lang;
  }
}
