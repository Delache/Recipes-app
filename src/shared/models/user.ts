export class User{
    _id: string = 'user'+ Date.now()
    name: string = ''
    surname: string = ''
    isAdmin: boolean = false
    type: string = 'user'
    _rev:string

    constructor(input?: User) {
            Object.assign(this, input);
    }
   
}