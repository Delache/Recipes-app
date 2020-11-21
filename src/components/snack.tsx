import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import GlobalCss from '../asset/globalCss'

const Snack = (props:any) => {
    const global = GlobalCss()
    const Alert = (props:any) =>{
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event:any, reason:any) => {
        if (reason === 'clickaway') {
            return
        }
        props.setError(false)
    }

    return(
        <div className={global.root}>
            <Snackbar open={props.error} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={props.severity?props.severity:'warning'} onClose={handleClose} >
                    {props.errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default Snack