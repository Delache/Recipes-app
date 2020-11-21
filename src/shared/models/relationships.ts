export class Relationship {
    _id : string 

    from : string = ''
    fromSurname : string = ''
    fromMail : string = ''

    to : string = ''
    toSurname : string = ''
    toMail : string = ''

    status : number = 0
    message : string = ''
    read : boolean = false

    type : string = 'relationship'
    _rev : string

    constructor(input?: Relationship) {
        Object.assign(this, input);
    }
}