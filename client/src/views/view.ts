import { get } from "../utils/ui";
import { Service } from "./service";

export class View {
    protected service: Service;
    private actualView: string;
    //private original: string;

    constructor(view: string, service?: Service) {
        get('root').innerHTML = view;
        this.actualView = view;
        this.service = service;
        //setInterval(() => this.checkView(), 1250);
    }

    public checkView() {
        //const renderView = get('root').innerHTML;
        const renderView = this.parse(this.actualView);
        //if (renderView !== this.actualView) {
            //console.log(renderView.documentElement.textContent, this.actualView.documentElement.textContent);
            get('root').innerHTML = renderView;
        //}
    }

    private parse(view: string): string {
        let result: string;
        let id: string;
        const parts = view.split('{{');
        if (parts.length) {
            for(var i=0; i<parts.length; i++) {
                const part = parts[i];
                const subparts = part.split('}}');
                if (subparts.length > 1) {
                    const resultEval = eval(subparts[0]);
                    result = result.concat(resultEval).concat(subparts[1])
                } else {
                    id = this.getId(subparts[0]);
                    result = subparts[0];
                }
            }
            return result;
        } 

        return view;
    }

    private getId(part: string) {
        const searchString = part.split('<').pop();
        const idPart = searchString.split(' id').pop();
        return idPart.split('"')[1];
    }
}