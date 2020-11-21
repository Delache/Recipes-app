import React, { useState, useEffect} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom"
import { Button, TextField, Typography, Grid }  from '@material-ui/core'
import { Urls } from  '../../environments/urls'
import fetch from 'isomorphic-fetch'
import Snack from '../../components/snack'

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

const Forget = (props: any) => {
    const history = useHistory()
    const styles = useStyles()
    const [mail, setMail] = useState('')
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('warning')
    const [message, setMessage] = useState('')
    
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const handleForget = () => {
        let urlencoded = new URLSearchParams();
        urlencoded.append("email", mail)

        fetch(Urls.api + '/forgetpassword', {
            method: 'POST',
            credentials: 'include',
            body: urlencoded
        }).then(response => response.json())
        .then(response => {
            if (response.ok === true) {
                setMessage('Votre nouveau mot de passe vient de vous être envoyé')
                setSeverity('success')
                setOpen(true)
            }else{
                setMessage('Email inconnu, si vous êtes un nouvel utilisateur cliquer sur "S\'inscrire"')
                setSeverity('warning')
                setOpen(true)
            }
        })
        .catch(error =>{
            setMessage('Une erreur s\'est produite : ' + error)
            setSeverity('error')
            setOpen(true)
        })    
    }
    
    return (
        <div className={styles.container}>
            <Grid container spacing={3} className={styles.loginCard}>
                
                <Grid item xs={12} >
                    <Typography className={styles.logoTitle} color='primary'>
                        La popote entre potes
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    <Typography variant='body1'>
                        Saisissez votre email pour recevoir votre nouveau mot de passe
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField  
                        variant="outlined" 
                        id = "email"
                        fullWidth margin="dense"  
                        value={mail} 
                        onChange={(data)=> setMail(data.target.value)}
                        label="Email" 
                        type="email" />
                </Grid>

                <Grid item md={6} xs={12}>
                    <Button 
                        onClick={()=>history.push('login')} 
                        fullWidth 
                        variant="contained" 
                        color="primary">
                        Retour
                    </Button>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Button 
                        onClick={handleForget} 
                        fullWidth 
                        variant="contained" 
                        color="primary">
                        Envoyer
                    </Button>
                </Grid>

            </Grid>
              
            <Snack
                error={open}
                setError={setOpen}
                errorMessage={message}
                severity={severity}/>
        </div>
    )
}

export default Forget