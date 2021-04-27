export const get = (id: any): any => document.getElementById(id) || {};

export const getFormData = (): any => {
    const inputFields = document.getElementsByTagName('input')
    let data = {}
    for(let i=0; i<inputFields.length; i++) {
        const id = inputFields[i].id;
        const htmlItem = get(id);
        if (id && htmlItem && htmlItem !== {}) {
            data = { ...data, [id]: htmlItem.value };
        }
    }  
    return data;  
}

export const addEventListener = (id: string, event: string, action: Function) => {
    const element = get(id);
    if (element) {
        element.addEventListener(event, async (event: any) => {
            event?.preventDefault();
            return await action();
        })
    }
}
