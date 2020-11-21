import React, { useState, Fragment, useEffect }from 'react'
import { Button, TextField, Typography, Grid, Paper }  from '@material-ui/core'
import { Urls } from '../../environments/urls'
import { Link, useHistory} from "react-router-dom"
import { useSelector } from  'react-redux'
import { RootReducer } from '../../shared/models/rootReducer'
import { familydb } from '../../databases'
import { User } from '../../shared/models/user'
import Snack from '../../components/snack'
import GlobalCss from '../../asset/globalCss'
const urljoin = require('url-join')

const RelationshipForm = (props: any) =>{  
    const global = GlobalCss()
    const history = useHistory()
    const [error, setError] = useState(false)
    const [toSurname, setToSurname] = useState('')
    const [toMail, setToMail] = useState('')
    
    const userSession = useSelector((state:RootReducer) => (state.displayData.userSession) ?state.displayData.userSession :new User())
    const [message, setMessage] = useState("Bonjour c'est "+ userSession.surname + ", \n je t'invite à découvrir le site 'La popote des potes'. Il te permettra d'enregistrer et d'organiser toutes tes recettes de cuisine et de partager (ou pas) ton livre avec tes amis. \n En tous cas en validant mon invitation tu pourras dès ton inscription, avoir accès au mien. 😉 \n A très bientôt!")

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const handleChange = (data: any, setState: Function) => {
        setState(data.target.value)
    }

    const checkEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(toMail).toLowerCase())
    }

    const sendNewRelationship = async () => {
        setError(false)
        if (checkEmail() === true && toSurname !== '') {
            let urlencoded = new URLSearchParams();
                urlencoded.append("toEmail", toMail)
                urlencoded.append("toSurname", toSurname)
                urlencoded.append("message", message)
                urlencoded.append("from", familydb )
                urlencoded.append("fromSurname", userSession.surname)
                urlencoded.append("fromMail", userSession.name)
    
            await fetch(urljoin(Urls.api, 'relationship'), {
                method: 'POST',
                mode: 'no-cors',
                body: urlencoded
            }).then(()=> history.push('/home'))
        }else{
            setError(true)
        }
    }

    return(
        <Fragment>
            <main className={global.formLayout}>
                <Paper className={global.paper}>
                    <Grid container spacing={1}>

                        <Grid item xs={12}>
                            <Typography variant="h5">
                               Invite tes potes
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                variant="outlined"
                                id="toName"
                                label="Nom du ou de la pote"
                                type="string"
                                fullWidth
                                value={toSurname}
                                onChange={(data) => handleChange(data, setToSurname)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={error}
                                margin="dense"
                                variant="outlined"
                                id="toEmail"
                                label="Son mail"
                                type="email"
                                fullWidth
                                value={toMail}
                                onChange={(data) => handleChange(data, setToMail)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="message"
                                label="Message"
                                multiline
                                fullWidth
                                variant="outlined"
                                rows="5"
                                value={message}
                                onChange={(data) => handleChange(data, setMessage)}
                            />
                        </Grid>

                        <Grid item xs={12} className={global.buttons}>
                            <Button  className={global.button} onClick={sendNewRelationship}  variant="contained" color="primary">
                                Inviter
                            </Button>
                            <Link to="/home">
                                <Button  className={global.button} onClick={props.onClose}  variant="contained" color="secondary">
                                    Annuler
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>
                </Paper>
                
                <Snack
                    error={error}
                    setError={setError}
                    errorMessage={'Remplis correctement tous les champs pour envoyer une invitation'}/>
            </main>
        </Fragment>
    )
}
export default RelationshipForm
