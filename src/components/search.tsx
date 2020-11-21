import React, { useState} from 'react'
import SearchBar from 'material-ui-search-bar'
import { useSelector } from 'react-redux'
import { RootReducer } from '../shared/models/rootReducer'
import { Recipe } from '../shared/models/recipe'
import { useHistory } from 'react-router-dom'

const Search = () => {
    const history = useHistory() 
    const [ request, setRequest ] = useState('')
    const recipes = useSelector( (state:RootReducer) => (state.displayData.recipes) ? Object.values(state.displayData.recipes) : [] )
    
    const handleChange = (data:any) => {
      setRequest(data)
    }

    const handleSearch = () => {
      const results = recipes.filter((recipe: Recipe) => recipe.label.toLowerCase().includes(request.toLowerCase())
                  //  || recipe.ingredients.map((ingredient:string)=>ingredient.toLowerCase().includes(request))
      )
      history.push({pathname:'/recipesResult', state:{results:results, request:request}})
      console.log(request, results)
    }

    return (
      <SearchBar
        value = {request}
        cancelOnEscape
        placeholder = 'Rechercher'
        onChange = { handleChange }
        onRequestSearch={ handleSearch }
      />
    )
}
export default Search