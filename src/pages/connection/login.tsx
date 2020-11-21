import React, { useState, useEffect} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom"
import { Button, TextField, Typography, Grid } from '@material-ui/core'
import { Urls } from  '../../environments/urls'
import { useDispatch } from 'react-redux'
import { replication } from '../../replication'
import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'
import fetch from 'isomorphic-fetch'
import Snack from '../../components/snack'
import GlobalCss from '../../asset/globalCss'
import SetData from '../../databases'
const crypto = require('crypto')
const urljoin = require('url-join')

PouchDB.plugin(PouchdbFind) 

const useStyles = makeStyles((theme: Theme) =>
    createStyles({    
        container:{
            paddingTop:'calc(50vh - 255px)'
        },
        logoTitle: {
            fontWeight:'bolder',
            fontSize:'70px',
            textAlign:'center',
        },
        loginCard: {
            margin: 'auto',
            maxWidth: '400px',
            height:'510px',
        }
    })
)

const Login = () => {
    const global = GlobalCss()
    const styles = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [connect, setConnect] = useState({login:'', password:''})
    const [error, setError] = useState(false)

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
    
    const handlechange = (data: any) => {
        setConnect({...connect, [data.target.id]:data.target.value})
    }

    const handleConnect = async () => {
        let urlencoded = new URLSearchParams();
            urlencoded.append("email", connect.login)
        const base64Password = crypto.createHmac('sha256', '')
            .update(connect.password, 'utf-8', 'base64')
            .digest('base64')
        urlencoded.append("password", base64Password)

        const rawResponse = await fetch(urljoin(Urls.api, 'login'), {
            method: 'POST',
            credentials: 'include',
            body: urlencoded
        })

        let session = await rawResponse.json()

        if (session.ok === true) {
            console.log(session.user)
            localStorage.setItem('userId', session.user._id)
            dispatch({ type: 'SET_USER_SESSION', data: session.user })
            dispatch({ type: 'SET_EDIT_MODE', data: false })
            SetData(session.roles[0])
            localStorage.setItem('db', session.roles[0])
            replication()
            history.push('/home')
        } else {
            setError(true)
        }
    }
    
    return (
        <div className={styles.container}>
            <Grid container spacing={3} className={styles.loginCard}>
                
                <Grid item xs={12} >
                    <Typography className={styles.logoTitle} color='primary'>
                        La popote entre potes
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField  
                        variant="outlined" 
                        id = "login"
                        fullWidth margin="dense"  
                        value={connect.login} 
                        onChange={handlechange}
                        label='Identifiant: email' 
                        type="email" />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        variant="outlined"  
                        id = "password"
                        fullWidth margin="dense"  
                        type="password" 
                        value={connect.password} 
                        onChange={handlechange}
                        label="Mot de passe" />
                </Grid>

                <Grid item xs={12}>        
                    <Typography 
                        variant="body1" 
                        color='primary'
                        className={global.hover}
                        style={{textAlign:'center'}}
                        onClick={()=>history.push('/forget')}>
                        Mot de passe oublié ?
                    </Typography>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Button 
                        onClick={()=>history.push('/signin')} 
                        className={global.secondAction}
                        fullWidth 
                        variant="contained" >
                        S'inscrire
                    </Button>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Button 
                        onClick={handleConnect} 
                        fullWidth 
                        variant="contained" 
                        color="primary">
                        Se connecter
                    </Button>
                </Grid>

            </Grid>
              
            <Snack
                error={error}
                setError={setError}
                errorMessage={`Identifiants incorrects`}/>
        </div>
    )
}

export default Login