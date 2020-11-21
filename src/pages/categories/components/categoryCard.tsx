import React, { useState, Fragment, useEffect } from 'react'
import { Card, CardContent, CardMedia, Snackbar, CardActions, 
         CircularProgress, Typography} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { localdb } from '../../../databases'
import { RootReducer } from '../../../shared/models/rootReducer'
import { Category } from '../../../shared/models/category'
import { Recipe } from '../../../shared/models/recipe'
import GlobalCss from '../../../asset/globalCss'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
         

const CategoryCard = (props: any) =>  {
  const global = GlobalCss()
  const history = useHistory()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('../asset/noPhoto.png')

  const childsCats = useSelector((state:RootReducer) => (state.displayData.categories)?Object.values(
    state.displayData.categories).filter((cat: Category)=> cat.idParent === props.category._id):[])
  
  const childsRecipes = useSelector((state:RootReducer) => (state.displayData.recipes)?Object.values(
    state.displayData.recipes).filter((recipe: Recipe)=> recipe.parentCategory === props.category._id):[])
    
  const editMode = useSelector((state:RootReducer) => state.displayData.editMode)
  
  useEffect(()=>{
    localdb.getAttachment(props.category._id, 'file').then((blob:any) => setUrl(URL.createObjectURL(blob)))
  },[props.category._id])                   

  const HandleClickDeleteCategory = () => {
    if(childsCats.length === 0 && childsRecipes.length === 0){
      dispatch({type: 'REMOVE_CATEGORY', data: props.category._id})
    }else{
        setOpen(true);
    }
  }

  const HandleClickEditCategory = () => {
    history.push({ pathname: "/categoryForm/", state:{category:props.category}})
  }

  const Alert = (props:any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const handleClose = (event:any, reason:any) => {
    if (reason === 'clickaway') {
        return
    }
    setOpen(false)
  }

  return (
    <Fragment>
      <Link to={{pathname: '/category/' + props.category._id, state:{category: props.category}}} >
        <Card className={global.card}>
          <CardContent className={global.cardContent}>
            <Typography variant='h3'className={global.content}>
              {props.category.label}
            </Typography>

            {url?
              <CardMedia
                image={url}
                component='img'
                className={global.media}
                />
              : <CircularProgress color="primary" />
            }

            {editMode?
              <CardActions disableSpacing >
          
                <IconButton onClick={HandleClickDeleteCategory} className={global.icons} edge="end" aria-label="delete" color="primary">
                  <DeleteIcon />
                </IconButton>
              
                <IconButton onClick={HandleClickEditCategory} className={global.icons} edge="end" aria-label="edit" color="primary">
                  <EditIcon />
                </IconButton>
                
              </CardActions>
            :<Fragment/>}

          </CardContent>
        </Card>
      </Link>

        <div className={global.root}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert severity="warning" onClose={handleClose} >
                  Cette catégorie contient des recettes ou des sous-catégories, veuillez les supprimer ou les déplacer avant de la supprimer.
              </Alert>
          </Snackbar>
        </div>

  </Fragment>
  )
}

export default CategoryCard