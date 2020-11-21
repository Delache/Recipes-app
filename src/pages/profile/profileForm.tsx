import React, { useState, Fragment, useEffect } from 'react'
import { TextField, Button, Typography, Grid, Paper, Card, CardContent }  from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
//import Snack from '../../components/snack'
import ChangePassword from'./components/changePassword'
import GlobalCss from '../../asset/globalCss'

const ProfileForm = (editMod: any) => {
    const edit = editMod.history.location.state
    const global = GlobalCss()
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState(edit.user)
    // const [open, setOpen] = useState(false)
    // const [severity, setSeverity] = useState('warning')
    // const [message, setMessage] = useState('')

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const handleChange = (data: any) => {
        setUser({...user, [data.target.id]:data.target.value})
    }

    const handleChangePhoto = (data:any) => {
        user._attachments = {
            file :{
                data:data.target.files[0],
                content_type:data.target.files[0].type
            }
        }
    }

    const updateUser = () => {
        dispatch({type: 'UPDATE_USER', data: user})
        history.push('/home')
    }

    return(
        <Fragment>
            <main className={global.formLayout}>
                <Paper className={global.paper}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography className={global.subTitle} variant="h5">
                                                Modifier mon profil
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                margin="dense"
                                                variant= "outlined"
                                                id="email"
                                                label="Email"
                                                type="text"
                                                fullWidth
                                                value={user.name}
                                                onChange={ handleChange }
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                margin="dense"
                                                variant= "outlined"
                                                id="surname"
                                                label="Pseudo"
                                                type="text"
                                                fullWidth
                                                value={user.surname}
                                                onChange={ handleChange }
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                className={global.button}
                                                color='primary'
                                                >
                                                <AddIcon/>
                                                
                                                Photo
                                                <input
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    onChange={ handleChangePhoto }

                                                />
                                            </Button>
                                        </Grid>

                                        <Grid  item xs={12} className={global.buttons}>
                                            <Button onClick= {updateUser}  variant="contained" color="primary" className={global.button}>
                                                Modifier
                                            </Button>
                                        </Grid>
                                        
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} >
                            <ChangePassword />
                        </Grid>

                        <Grid item xs={12}>
                            <Link to="/home">
                                <Button  variant="contained" color="secondary" className={global.button}>
                                    Annuler
                                </Button>
                            </Link>
                        </Grid>

                    </Grid>
                </Paper>
            </main>
            {/* <Snack
                error={open}
                setError={setOpen}
                errorMessage={message}
                severity={severity}/> */}
        </Fragment>
    )
}
export default ProfileForm