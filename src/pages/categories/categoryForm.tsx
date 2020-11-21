import React, {useState, Fragment, useEffect} from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, Grid, Paper, FormControl, Select, InputLabel,
         MenuItem, Card, CardContent }  from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../shared/models/rootReducer'
import { Link, useHistory } from 'react-router-dom'
import { Category } from '../../shared/models/category'
import AddIcon from '@material-ui/icons/Add'
import imageCompression from 'browser-image-compression'
import Header from '../../components/appBar'
import GlobalCss from '../../asset/globalCss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({  
        image : {
            width: "100%",
            height: "100%",
            position: "relative"
        }
    })
)

const CategoryForm = (editMod: any) => {
    const global = GlobalCss()
    const styles = useStyles()
    const edit = editMod.history.location.state
    const history = useHistory()
    const dispatch = useDispatch()
    const [category, setCategory] = useState(edit? new Category(edit.category) : new Category())
    const [file, setFile] = useState(null)
    
    const categories = useSelector((state:RootReducer) => state.displayData.categories ? state.displayData.categories :[])

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const handleChange = (data: any) => {
        setCategory({...category, [data.target.id]:data.target.value})
    }

    const handleChangePhoto = async (data:any) => {
        const imageFile = data.target.files[0]
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
       
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }

        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
       
            category._attachments = {
                file :{
                    data:compressedFile,
                    content_type:compressedFile.type
                }
            }
            setFile(compressedFile)

        } catch (error) {
           console.log(error);
        }

        // category._attachments = {
        //     file :{
        //         data:data.target.files[0],
        //         content_type:data.target.files[0].type
        //     }
        // }
        // setFile(data.target.files[0])
    }

    const handleCategoryChange = (event: any) => {
        setCategory({ ...category, idParent: event.target.value})
    }

    const sendcategory = () => {
        dispatch(edit?{type: 'UPDATE_CATEGORY', data: category}:{type: 'ADD_CATEGORY', data: category})
        history.push(category.idParent!== "" ? {pathname: "/category/" + category.idParent, state:{category:categories[category.idParent as any]}} : '/home')
    }

    return(
        <Fragment>
            <Header/>

            <main className={global.formLayout}>
                <Paper className={global.paper}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Typography className={global.subTitle} variant="h5">
                                {edit? 'Modifier ': 'Ajouter '} une catégorie
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth margin="dense" >
                                <InputLabel id="idParent">Catégorie parente</InputLabel>
                                <Select id="idParent" margin="dense" variant="outlined" 
                                        label={"Catégorie parente"} value ={category.idParent}  
                                        onChange={(data) => handleCategoryChange(data)}>
                                    {Object.values(categories).length===0 ?
                                        <MenuItem disabled> Aucune catégorie enregistrée</MenuItem> :
                                    
                                    Object.values(categories).filter((cat:Category)=> cat._id !== category._id)
                                                .map((cat: Category) => 
                                        <MenuItem value={cat._id} key={cat._id}> {cat.label} </MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                variant= "outlined"
                                id="label"
                                label="Nom de la catégorie"
                                type="text"
                                fullWidth
                                value={category.label}
                                onChange={(data) => handleChange(data)}
                            />
                        </Grid>

                        {file ? 
                            <Grid item xs={12} >
                                <Card style={{paddingBottom:0,marginBottom:0}}>
                                    <CardContent style={{padding:0,marginBottom:0}}>
                                        <img className={styles.image} 
                                            src={file ? URL.createObjectURL(file) : null} 
                                            alt={file ? file.name : null}/>
                                    </CardContent>
                                </Card>
                            </Grid>
                        :<Fragment/>}
                       
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
                                    accept="image/*" 
                                    multiple = { false } 
                                    style={{ display: "none" }}
                                    onChange={(data:any) => handleChangePhoto(data)}

                                />
                            </Button>
                        </Grid>

                        <Grid  item xs={12} className={global.buttons}>
                        
                            <Button onClick= {sendcategory}  variant="contained" color="primary" className={global.button}>
                                {edit? 'Modifier': 'Ajouter'} 
                            </Button>
                           
                            <Link to={{ pathname: (category.idParent === '' ) ? "/home/" : "/category/" + category.idParent, 
                                        state: (category.idParent === '' ) ? null : {category:categories[category.idParent as any]}  }}>
                                <Button  variant="contained" color="secondary" className={global.button}>
                                    Annuler
                                </Button>
                            </Link>

                        </Grid>
                    </Grid>
                </Paper>
            </main>
    </Fragment>
    )
}

export default CategoryForm