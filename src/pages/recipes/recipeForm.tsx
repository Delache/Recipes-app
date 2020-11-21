import React, {useState, Fragment, useEffect} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField, Card, CardContent, Button, Typography, Grid, Paper, 
         FormControl, Select, InputLabel, MenuItem, InputAdornment } from '@material-ui/core'
import { Recipe } from '../../shared/models/recipe'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Category } from '../../shared/models/category'
import { RootReducer } from '../../shared/models/rootReducer'
import AddIcon from '@material-ui/icons/Add' 
import GlobalCss from '../../asset/globalCss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({  
        image : {
            maxWidth: "500px",
            height: "auto",
            position: "relative",
            margin:'auto',

        }
    })
)

const RecipeForm = (editMod: any) => {
    const edit = editMod.history.location.state
    const global = GlobalCss()
    const styles = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [recipe, setRecipe] = useState(edit? new Recipe(edit.recipe): new Recipe())
    const [recipeIngredients, setRecipeIngredients] = useState(edit ? recipe.ingredients.join('\n') :'')
    const [recipeSteps, setRecipeSteps] = useState(edit? recipe.steps.join('\n') :'')
    const [file, setFile] = useState(null)

    const categories = useSelector((state:RootReducer) => state.displayData.categories ? state.displayData.categories :[])

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const handleChange = (data: any) => {
        setRecipe({...recipe, [data.target.id]:data.target.value})
    }

    const handleChangeCategory = (data: any) => {
        setRecipe({...recipe, parentCategory:data.target.value})
    }
    
    const handleChangePhoto = (data:any) => {
        recipe._attachments = {
            file :{
                data:data.target.files[0],
                content_type:data.target.files[0].type
            }
        }
    }

    const sendRecipe = () => {
        recipe.ingredients = [...recipeIngredients.split('\n')]
        recipe.steps = [...recipeSteps.split('\n')]
        dispatch(edit?{type: 'UPDATE_RECIPE', data: recipe}:{type: 'ADD_RECIPE', data: recipe})
        history.push({pathname: "/recipe/"+recipe._id, state:{recipe:recipe}})
    }

    return(
        <Fragment>
            <main className={global.formLayout}>
                <Paper className={global.paper}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Typography className={global.subTitle} variant="h5">
                              {edit? 'Modifier ': 'Ajouter '} une recette
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth margin="dense" >
                                <InputLabel id="parentCategory">Catégorie</InputLabel>
                                <Select id="parentCategory" 
                                        labelId = "parentCategory"
                                        margin = "dense" 
                                        variant = "outlined" 
                                        label= "Catégorie"
                                        value = {recipe.parentCategory}  
                                        onChange={(data) => handleChangeCategory(data)}>
                                    {Object.values(categories).length===0 ?
                                        <MenuItem disabled> Aucune catégorie enregistrée</MenuItem> :
                                    
                                    Object.values(categories).map((cat: Category) => 
                                        <MenuItem value={cat._id} key={cat._id}> {cat.label} </MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant= "outlined"
                                margin="dense"
                                label="Nom de la recette"
                                id="label"
                                type="text"
                                fullWidth
                                value={recipe.label}
                                onChange={ (data) => handleChange(data) }/>
                        </Grid>
          
                        <Grid item md={6} xs={12}>
                            <TextField
                                margin="dense"
                                variant= "outlined"
                                id="nbEaters"
                                label="Nombre de personnes"
                                type="number"
                                fullWidth
                                inputProps={{ min: 0, max:12 }}
                                value={recipe.nbEaters}
                                onChange={(data) => handleChange(data)} />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                margin="dense"
                                variant= "outlined"
                                id="difficulty"
                                label="Difficulté"
                                type="number"
                                fullWidth
                                value={recipe.difficulty}
                                inputProps={{ min: 0, max:3 }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">★</InputAdornment>,
                                  }}
                                onChange={(data) => handleChange(data)} />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                margin="dense"
                                variant= "outlined"
                                id="cookingTime"
                                label="Temps de cuisson"
                                type="number"
                                fullWidth
                                value={recipe.cookingTime}
                                inputProps={{ min: 0, max:300 }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                                }}
                                onChange={(data) => handleChange(data)}/>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                margin="dense"
                                variant= "outlined"
                                id="preparationTime"
                                label="Temps de préparation"
                                type="number"
                                fullWidth
                                value={recipe.preparationTime}
                                inputProps={{ min: 0, max:300 }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                                  }}
                                onChange={(data) => handleChange(data)} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                multiline = {true}
                                margin = "dense"
                                variant = "outlined"
                                id = "ingredients"
                                label = "Ingrédients"
                                type = "text"
                                fullWidth
                                value = {recipeIngredients}
                                onChange={(data) =>  setRecipeIngredients(data.target.value)} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                multiline = {true}
                                variant= "outlined"
                                id="steps"
                                label="Etapes"
                                type="text"
                                fullWidth
                                value={recipeSteps}
                                onChange={(data) => setRecipeSteps(data.target.value)} />
                        </Grid>

  
                        <Grid item md={8} xs={12}>
                            <TextField
                                margin="dense"
                                multiline = {true}
                                variant= "outlined"
                                id="tips"
                                label="Astuce"
                                type="text"
                                fullWidth
                                value={recipe.tips}
                                onChange={(data) => handleChange(data)} />
                        </Grid>

                        {file ? 
                        <Grid item md={6} xs={12} >
                            <Card style={{paddingBottom:0,marginBottom:0}}>
                                <CardContent style={{padding:0, marginBottom:0}}>
                                    <img className={styles.image} 
                                        src={file ? URL.createObjectURL(file) : null} 
                                        alt={file ? file.name : null}/>
                                </CardContent>
                            </Card>
                        </Grid>:<Fragment/>}

                        <Grid item md={4} xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                className={global.button}
                                color='primary'>
                                <AddIcon/>
                                Photo
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(data:any) => handleChangePhoto(data)} />
                            </Button>
                        </Grid>

                        <Grid  item xs={12} className={global.buttons}>
                            <Button onClick= {sendRecipe}  variant="contained" color="primary" className={global.button}>
                                {edit? 'Modifier': 'Ajouter'} 
                            </Button>
                            <Link to={"/home/"}>
                                <Button  variant="contained" color="secondary" className={global.button}>
                                    Annuler
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>
                </Paper>
            </main>
        </Fragment>
    )
}

export default RecipeForm