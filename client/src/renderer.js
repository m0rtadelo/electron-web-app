window.onload = async function() {
    document.getElementById('form').addEventListener('submit',async (event) => {
        event.preventDefault();
        const fields = document.getElementsByTagName("input")
        let data = {}
        for(let i=0; i<fields.length; i++) {
            const id = fields[i].id;
            const item = document.getElementById(id);
            if (item) {
                const elem = {}
                elem[id] = item.value
                data = { ...data, ...elem };
            }
        }
        const result = await window.api.post({
            action: 'login',
            data
        });
        console.log(result);
    })
};
