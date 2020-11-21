import { DisplayState } from '../../shared/models/displayState'
import { Category } from '../../shared/models/category'
import { Recipe } from '../../shared/models/recipe'
import { User } from '../../shared/models/user'
import { Connection } from '../../shared/models/connection'

const displayDataReducer = (state: DisplayState, action: any) => {

    switch (action.type) {

        case 'SET_USER_SESSION':
            return { ...state, userSession: action.data }
        case 'UPDATE_USER_SESSION':
            return { ...state, userSession: action.data }

        case 'SET_EDIT_MODE':
            return { ...state, editMode: action.data}
        case 'UPDATE_EDIT_MODE':
            return  { ...state, editMode: action.data}
        
        case 'SET_CATEGORIES':
            const cat = action.data.reduce((result: any, obj: Category) => ({ ...result, [obj._id]: new Category(obj) }), {})
            return { ...state, categories: cat }
        case 'ADD_CATEGORY':
            let category = { ...state.categories }
                category[action.data._id ] = action.data
            return { ...state, categories: category }
        case 'REMOVE_CATEGORY':
            let newCategories = { ...state.categories }
            delete newCategories[action.data]
            return { ...state, categories: newCategories }
        case 'UPDATE_CATEGORY':
            let updatedCategory = { ...state.categories }
                updatedCategory[action.data._id] = action.data
            return { ...state, categories: updatedCategory }

        case 'SET_USERS':
            return { ...state, users: action.data }
        case 'ADD_USER':
            let userAdd = { ...state.users }
                userAdd[action.data._id] = action.data
            return { ...state, users: userAdd }
        case 'REMOVE_USER':
            let UserRemove = { ...state.users }
            delete UserRemove[action.data]
            return { ...state, users: UserRemove }
        case 'UPDATE_USER':
            let userUpdated = { ...state.users }
                userUpdated[action.data._id] = action.data
            return { ...state, users: userUpdated }
        
        case 'SET_RECIPES':
            const recipe = action.data.reduce((result: any, obj: Recipe) => ({ ...result, [obj._id]: new Recipe(obj) }), {})
            return { ...state, recipes: recipe }
        case 'ADD_RECIPE':
            let recipeAdd = { ...state.recipes }
                recipeAdd[action.data._id] = action.data
            return { ...state, recipes: recipeAdd }
        case 'REMOVE_RECIPE':
            let recipeRemove = { ...state.recipes }
            delete recipeRemove[action.data]
            return { ...state, recipes: recipeRemove }
        case 'UPDATE_RECIPE':
            let recipeUpdated = { ...state.recipes }
                recipeUpdated[action.data._id] = action.data
            return { ...state, recipes: recipeUpdated }


            case 'SET_ALL':
            
                let recipesArray: Array<Recipe> = []
                let categoriesArray: Array<Category> = []
                let usersArray: Array<User> = []
                let connectionsArray: Array<Connection> = []
                let userSession: User

                for (let doc of action.data) {
                    if (doc._id === localStorage.getItem('userId')) {
                        userSession = doc
                    }
                    switch (doc.type) {
                        case 'recipe':
                           recipesArray.push(doc)
                            break
                        case 'category':
                            categoriesArray.push(doc)
                            break
                        case 'user':
                            usersArray.push(doc)
                            break
                        case 'connection':
                            connectionsArray.push(doc)
                            break
                        case 'relationship':
                    }
                }
    
                return {
                    ...state,
                    userSession: userSession,
                    //editMode: editMode,
                    recipes: recipesArray.reduce((result: any, obj: Recipe) => ({ ...result, [obj._id]: new Recipe(obj) }), {}),
                    categories: categoriesArray.reduce((result: any, obj: Category) => ({ ...result, [obj._id]: new Category(obj) }), {}),
                    users: usersArray.reduce((result: any, obj: User) => ({ ...result, [obj._id]: new User(obj) }), {}),
                }
          
            default:
                return { ...state }
    }
}

export default displayDataReducer