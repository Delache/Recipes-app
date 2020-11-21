export class Recipe{
    _id: string = 'recipe'+ Date.now()
    parentCategory =''
    label: string = ''
    ingredients : Array<string> = []
    steps: Array<string> = []
    nbEaters: number
    cookingTime: number
    preparationTime: number
    difficulty: number
    tips: string = ''
    _attachments:{
        file :{
            data:any
            content_type:string
        }
    }
    type: string = 'recipe'
    _rev:string

    constructor(input?: Recipe) {
            Object.assign(this, input);
    }
}