import React, { Fragment } from 'react'
import { Recipe } from '../../shared/models/recipe'
import { Grid } from '@material-ui/core'
import RecipeResultCard from './components/recipeResultCard'
import Header from '../../components/appBar'
import GlobalCss from '../../asset/globalCss'

const RecipesResult = (editMod: any) => {
    const results = editMod.history.location.state.results
    const request = editMod.history.location.state.request
    const global = GlobalCss()

    return(
        <Fragment>
            <Header title={`Résultats pour : "${request}"`}/>
            <main className={global.layout}>

                <Grid container spacing={3} style={{marginTop:'2%'}}>
                    {results.length > 0 ?
                        <Fragment>
                            <Grid container spacing={1}>
                                {results.map((result:Recipe) => 
                                    <Grid item lg={4} md={6} xs={12} key={result._id}>
                                        <RecipeResultCard recipe={result}/>
                                    </Grid>
                                )}
                            </Grid>
                        </Fragment>

                        :<h1>Aucun résultat trouvé</h1>
                    }
                </Grid>
        
            </main>
        </Fragment>
    )
}

export default RecipesResult