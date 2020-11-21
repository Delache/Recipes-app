import React, { useState, Fragment } from 'react'
import { TextField, Button, Typography, Grid, Card, CardContent}  from '@material-ui/core'
import { Urls } from  '../../../environments/urls'
import { useSelector } from  'react-redux'
import { RootReducer } from '../../../shared/models/rootReducer'
import { User } from '../../../shared/models/user'
import Snack from '../../../components/snack'
import GlobalCss from '../../../asset/globalCss'
const crypto = require('crypto')

const ChangePassword = () => {
    const global = GlobalCss()

    const [oldPass, setOldPass] = useState('')
    const [newPass1, setNewPass1] = useState('')
    const [newPass2, setNewPass2] = useState('')

    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('warning')
    const [message, setMessage] = useState('')

    const userSession = useSelector((state:RootReducer) => state.displayData.userSession ? state.displayData.userSession : new User() )

    const updatePassword = () => {
        if (oldPass !== ''){
            if (newPass1 !==''){
                if (newPass2 !==''){
                    if (newPass1 === newPass2){

                        const base64OldPassword = crypto.createHmac('sha256', '')
                            .update(oldPass, 'utf-8', 'base64')
                            .digest('base64')

                        const base64NewPassword = crypto.createHmac('sha256', '')
                            .update(newPass1, 'utf-8', 'base64')
                            .digest('base64')
                        
                        let urlencoded = new URLSearchParams();
                            urlencoded.append("mail", userSession.name)
                            urlencoded.append("oldPass", base64OldPassword)
                            urlencoded.append("newPass", base64NewPassword)
                
                        fetch(Urls.api + '/changepassword', {
                            method: 'POST',
                            credentials: 'include',
                            body: urlencoded
                        }).then(response => response.json())

                        .then(response => {
                            if (response.ok === true) {
                                setMessage('Nouveau mot de passe enregistré')
                                setSeverity('success')
                                setOpen(true)
                            }else{
                                setMessage('Mot de passe incorrect')
                                setSeverity('danger')
                                setOpen(true)
                            }
                        })
                        .catch(error =>{
                            setMessage('Une erreur s\'est produite : ' + error)
                            setSeverity('error')
                            setOpen(true)
                        }) 
                    }else{
                        setMessage('Les saisies du nouveau mot de passe ne correspondent pas')
                        setOpen(true)
                    }
                }else{
                    setMessage('Confirme ton nouveau mot de passe')
                    setOpen(true)
                }
            }else{
                setMessage('Saisis ton nouveau mot de passe')
                setOpen(true)
            }
        }else{
            setMessage('Saisie ton mot de passe actuel')
            setOpen(true)
        }
    }

    return(
        <Fragment>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className={global.subTitle} variant="h5">
                                Changer mon mot de passe
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                variant= "outlined"
                                id="oldPass"
                                label="Mot de passe actuel"
                                type="password"
                                fullWidth
                                value={oldPass}
                                onChange={(data) => setOldPass(data.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                variant= "outlined"
                                id="newPass1"
                                label="Nouveau mot de passe"
                                type="password"
                                fullWidth
                                value={newPass1}
                                onChange={(data) => setNewPass1(data.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                variant= "outlined"
                                id="newPass2"
                                label="Confirme ton nouveau mot de passe"
                                type="password"
                                fullWidth
                                value={newPass2}
                                onChange={(data) => setNewPass2(data.target.value)}
                            />
                        </Grid>

                        <Grid  item xs={12} className={global.buttons}>
                            <Button onClick= {updatePassword}  variant="contained" color="primary" className={global.button}>
                                Modifier mon mot de passe
                            </Button>
                        </Grid>
                    </Grid>      
                </CardContent>               
            </Card>   

            <Snack
                error={open}
                setError={setOpen}
                errorMessage={message}
                severity={severity}/>
        </Fragment>
    )
}
export default ChangePassword