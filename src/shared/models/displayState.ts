import { Relationship } from './relationships';
import { User } from './user'
import { Category } from './category'
import { Recipe } from './recipe'

export class DisplayState {
    users? : Array<User> = []
    categories? : Array<Category> = []
    recipes? : Array<Recipe> = []
    userSession? : User = new User()
    editMode? : boolean = false
    relationships? : Array<Relationship> = []

    constructor(input?: DisplayState) {
            Object.assign(this, input);
    }
}