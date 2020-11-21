export class Category {
    _id: string = 'category' + Date.now()
    idParent: string = ""
    label: string = ""
    _attachments:{
        file :{
            data:any
            content_type:string
        }
    }
    type: string = 'category'
    _rev:string

    constructor(input?: Category) {
        Object.assign(this, input);
    }
}