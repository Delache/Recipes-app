import React, { Fragment, useEffect } from 'react'
import { Typography, Button, Grid } from '@material-ui/core/'
import { Urls } from '../../environments/urls'
import { Link, useHistory } from "react-router-dom"
import { User } from '../../shared/models/user'
import { useDispatch, useSelector } from  'react-redux'
import { RootReducer } from '../../shared/models/rootReducer'
import { Relationship } from '../../shared/models/relationships'
import RelationshipCard from './components/relationshipCard'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import GlobalCss from '../../asset/globalCss'
const urljoin = require('url-join')

const Relationships = (props: any) => {
    const global = GlobalCss()
    const dispatch = useDispatch()
    const history = useHistory()

    const relationships = useSelector((state:RootReducer) => (state.displayData.relationships) ? Object.values(state.displayData.relationships) : [])
    const userSession = useSelector( (state:RootReducer) => (state.displayData.userSession)?state.displayData.userSession:new User())

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const read = (relationship : Relationship)=>{
        if (relationship.read === false) {
            dispatch({ type: 'UPDATE_RELATIONSHIP', data: {...relationship, read:true } })
        }
    }
 
    const acceptRelationship =  async (doc: any) => {
        let urlencoded = new URLSearchParams();
            urlencoded.append("idRelationship", doc._id)
            urlencoded.append("toSurname", userSession.surname)

        const rawResponse = await fetch(urljoin(Urls.api, 'relationship', 'validate'), {
            method: 'POST',
            mode: 'no-cors',
            body: urlencoded
        })
        console.log(rawResponse)
    }

    const refuseRelationship = (doc: any) => {
        dispatch({type: 'UPDATE_RELATIONSHIP', data:{...doc, status:2}})
    }

    return (
        <Fragment>
            <Typography className={global.title} variant="h5">
                Mes potes
                <Button onClick = { () => history.push('/relationshipForm') } 
                        variant = "contained"
                        color = "primary"
                        className = { global.button }
                        endIcon = { <NoteAddIcon /> }>
                    Inviter
                </Button>
            </Typography>

            <Typography variant="subtitle2">
                Les livres des potes
            </Typography> 

                <Grid container spacing={1} style={{marginTop:'2%'}}>
                    {relationships.map((relationship: Relationship) => 
                        <Grid key={relationship._id} item lg={4} md={6} xs={12}>    
                            <Link onClick={ ()=>read(relationship) }
                                  key={ relationship._id } 
                                  to={ { pathname:"/relationship/" + relationship._id, 
                                         state:{ relationship: relationship} }
                                  }>
                                <RelationshipCard relationship = { relationship }
                                                  refuserelationship = { refuseRelationship }
                                                  acceptrelationship = { acceptRelationship }/>
                            </Link>
                        </Grid>
                    )}
                </Grid>

        </Fragment>
    )
}

export default Relationships

