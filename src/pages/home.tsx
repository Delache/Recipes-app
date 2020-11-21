import React, {Fragment}from 'react'
import { Grid } from '@material-ui/core'
import { User } from '../shared/models/user'
import { useSelector } from 'react-redux'
import { RootReducer } from '../shared/models/rootReducer'
import { apostrophe } from '../shared/options'
import CategoryCard from './categories/components/categoryCard'
import Header from '../components/appBar'
import GlobalCss from '../asset/globalCss'

const Home = () => {
    const global = GlobalCss()

    const userSession = useSelector((state:RootReducer) => state.displayData.userSession ? state.displayData.userSession : new User())
    const categories = useSelector((state:RootReducer) => (state.displayData.categories)?Object.values(state.displayData.categories) : [])

    return (
        <Fragment>
            <Header title={`La popote ${apostrophe(userSession.surname ? userSession.surname : 'qui')} `}/>

            <main className={global.layout}>
                <Grid container spacing={3} style={{marginTop:'2%'}} >
                    {categories.filter(cat=>cat.idParent==='').map(cat =>
                    <Grid item lg={3} md={6} xs={12} key={cat._id}>
                        <CategoryCard category={cat}/>
                    </Grid>)}
                </Grid>
            </main>
            
        </Fragment>
    )
}
export default Home