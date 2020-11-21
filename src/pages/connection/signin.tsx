import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography, Grid } from '@material-ui/core/Button'
import { useHistory } from "react-router-dom"
import { Urls } from '../../environments/urls'
import Snack from '../../components/snack'
import GlobalCss from '../../asset/globalCss'

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
        },
        message:{
            textAlign:'center'
        }
    })
)

const Signin = () => {
    const global = GlobalCss()
    const styles = useStyles()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [surname, setSurname] = useState('')
    const [done, setDone] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage]= useState('')

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const signin = async () => {
        if(email === ''){
            setErrorMessage('Veuillez entrer un email valide')
            setError(true)
        }else if(surname === ''){
            setErrorMessage('Veuillez entrer un pseudo')
            setError(true)
        }else{
            const urlencoded = new URLSearchParams();
                  urlencoded.append("email", email)
                  urlencoded.append("surname", surname)

            const rawResponse = await fetch(Urls.api + '/signin', {
                method: 'POST',
                mode: 'no-cors',
                body: urlencoded
            })
            // const response = await rawResponse.json()
            console.log(rawResponse)
            setDone(true)
        }
    }

    return (
       <div className={styles.container}>
            {(done === false) ?
                <Grid container spacing={3} className={styles.loginCard}>

                    <Typography className={styles.logoTitle} color='primary'>
                        La popote entre potes
                    </Typography>
                
                    <Grid item xs={12}>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            margin="dense" 
                            value={email} 
                            onChange={(data:any)=>setEmail(data.target.value)}
                            label="Email" 
                            type="email" 
                            required />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            margin="dense" 
                            type="text" 
                            value={surname} 
                            onChange={(data:any)=>setSurname(data.target.value)}
                            label="Pseudo" />
                    </Grid>

                    <Grid item md ={6} xs={12}>
                        <Button 
                            onClick={()=>history.push('/login')} 
                            variant="contained" 
                            className={global.secondAction}
                            fullWidth >
                            Se connecter
                        </Button>
                    </Grid>
                    
                    <Grid item md ={6} xs={12}>
                        <Button 
                            onClick={signin} 
                            variant="contained" 
                            fullWidth color="primary">
                            S'inscrire
                        </Button>
                    </Grid>

                </Grid>
                :<h3 className={styles.message }>Email envoyé !</h3>
            }
            <Snack
                error = { error }
                setError = { setError }
                errorMessage = { errorMessage }/>
        </div>
    )
}

export default Signin