import React, { Fragment } from 'react'
import { Card, CardContent , Paper, Grid} from '@material-ui/core'
//, IconButton
import { Recipe } from '../../shared/models/recipe'
// import { useDispatch, useSelector } from 'react-redux'
// import {useHistory} from 'react-router-dom'
// import { RootReducer } from '../../shared/models/rootReducer'
// import DeleteIcon from '@material-ui/icons/Delete'
// import EditIcon from '@material-ui/icons/Edit'
import StarIcon from '@material-ui/icons/Star'
import Header from '../../components/appBar'
import GlobalCss from '../../asset/globalCss'

const RecipeDetails = (editMod:any) => {
    const global = GlobalCss()
    //const history = useHistory()
    //const dispatch = useDispatch()
    const edit = editMod.history.location.state
    const recipe = new Recipe(edit.recipe)
    //const [url, setUrl] = useState('')
    //const editMode = useSelector((state:RootReducer) => state.displayData.editMode)
    //const categories = useSelector( (state:RootReducer) => state.displayData.categories?state.displayData.categories:[])
    
//   const HandleClickDeleteRecipe = () => {
//     dispatch({type: 'REMOVE_RECIPE', data: recipe._id})
//     history.push( {pathname:'/category/'+ recipe.parentCategory, state:{category:categories[recipe.parentCategory as any]} } )
//   }

    return (
        <Fragment>

            {/* <Layout title = {
                editMode ?
                    <span>
                        {recipe.label}
                        <IconButton onClick={HandleClickDeleteRecipe} edge="end" aria-label="delete" >
                            <DeleteIcon />
                        </IconButton>
                        
                        <Link to={{ pathname: "/recipeForm/", state:{recipe:recipe}}}>
                            <IconButton edge="end" aria-label="edit" >
                                <EditIcon />
                            </IconButton>
                        </Link> 
                    </span>: recipe.label
            } /> */}

            <Header/>
            <main className={global.layout}>
                <Paper className={global.paper}>
                    <Grid container spacing={3}>

                       <Grid item xs={12} style={{textAlign:'center'}}>
                            Pour {recipe.nbEaters} personnes | Préparation {recipe.preparationTime} minutes | Cuisson {recipe.cookingTime} minutes
                       </Grid>
                     
                       <Grid item xs={12} style={{textAlign:'center'}}>
                            Difficulté { Number( recipe.difficulty ) === 1 ? <StarIcon/> : 
                                         Number( recipe.difficulty ) === 2 ? <Fragment> <StarIcon/> <StarIcon/> </Fragment> :
                                         Number( recipe.difficulty ) === 3 ? <Fragment> <StarIcon/> <StarIcon/> <StarIcon/> </Fragment> :
                                        <Fragment/> }
                       </Grid>

                        <Grid item xs={12} style={{textAlign:'center'}}>
                          {recipe.ingredients.join(' | ') }
                        </Grid>

                        {recipe.steps.map((line, i)=>
                            <Grid item xs={12} key={i}>
                                {recipe.steps.indexOf(line)+1} -  { line }
                            </Grid>)
                        }

                        <Grid item xs={12}>
                            <Card className={global.tips}>
                                <CardContent>
                                    Astuce : {recipe.tips}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </Fragment>
    )
}

export default RecipeDetails