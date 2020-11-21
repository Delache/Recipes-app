import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../shared/models/rootReducer'
import { Category } from '../../shared/models/category'
import Header from '../../components/layout'
import CategoryCard from './components/categoryCard'
import RecipeCard from '../recipes/components/recipeCard'
import GlobalCss from '../../asset/globalCss'

const CategoryDetails = (props: any) => {
    const global = GlobalCss()
    const edit = props.history.location.state
    const category = edit ? new Category(edit.category): new Category()
    const categories = useSelector( (state:RootReducer) => (state.displayData.categories)?Object.values(state.displayData.categories):[])
    const recipes = useSelector( (state:RootReducer) => (state.displayData.recipes)?Object.values(state.displayData.recipes):[])

    return (
        <Fragment>
            <Header/>
            <main className={global.layout} >

                <Grid container spacing={3} style={{marginTop:'2%'}} >

                    {categories.filter(cat=>cat.idParent === category._id).map(cat =>
                        <Grid item lg ={3} md={6} xs={12} key={cat._id}>
                            <CategoryCard category={cat}/>
                        </Grid>)
                    }

                    {recipes.filter(recipe=>recipe.parentCategory === category._id).map(recipe =>
                        <Grid item lg ={3} md={6} xs={12} key={recipe._id}>
                            <RecipeCard recipe={recipe}/>
                        </Grid>)
                    }

                </Grid>
            </main>
        </Fragment>
    )
}

export default CategoryDetails