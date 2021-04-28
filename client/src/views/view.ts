import { get } from "../utils/ui";
import { Service } from "./service";
import { BannerErrorComponent } from '../components';

export class View {
    protected service: Service;
    private actualView: string;
    private banner = new BannerErrorComponent();
    private components = [this.banner];

    constructor(view: string, service?: Service) {
        get('root').innerHTML = view;
        this.actualView = view;
        this.service = service;
        this.addComponents();
    }

    public addComponents() {
        this.components.forEach(component => {
            const domElements = document.getElementsByTagName(component.selector);
            for (var i=0; i<domElements.length; i++) {
                component.render(this, domElements[i]);
            }
        })
    }
}