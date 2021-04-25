export class UI {
    public get = (id: any): any => document.getElementById(id);
    public getFormData = (): any => {
        const inputFields = document.getElementsByTagName('input')
        let data = {}
        for(let i=0; i<inputFields.length; i++) {
            const id = inputFields[i].id;
            const htmlItem = this.get(id);
            if (htmlItem) {
                data = { ...data, [id]: htmlItem.value };
            }
        }  
        return data;  
    }
}