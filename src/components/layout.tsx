import React, { Fragment } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import { Drawer, CssBaseline, Divider, ListItem, ListItemIcon, ListItemText, Switch, List } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector,  useDispatch } from  'react-redux'
import { RootReducer } from '../shared/models/rootReducer'
import { User } from '../shared/models/user'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MailIcon from '@material-ui/icons/Mail'
import PersonIcon from '@material-ui/icons/Person'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import LocalDiningIcon from '@material-ui/icons/LocalDining'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import EditIcon from '@material-ui/icons/Edit'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      textAlign:'center',
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
)

export default function Layout() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const theme = useTheme()
  const editMode = useSelector((state:RootReducer) => state.displayData.editMode ? state.displayData.editMode : false)
  const userSession = useSelector((state:RootReducer) => state.displayData.userSession ? state.displayData.userSession : new User() )
  
  const handleDisconnect = () => {
    //reset Data
    history.push('/login')
  }
  
  const items = [
    { icon: <CreateNewFolderIcon/>, name: 'Ajouter une sous-catégorie', action: ()=>history.push( '/categoryForm') },
    { icon: <LocalDiningIcon/>, name: 'Ajouter une recette', action: ()=>history.push('/recipeForm') },
    { icon: <PersonIcon/>, name: 'Mon profil', action: ()=>history.push({pathname: '/profileform', state:{user:userSession}}) },
    { icon: <MailIcon/>, name: 'Inviter mes potes', action: ()=>history.push('/relationshipForm') },
    { icon: <ExitToAppIcon/>, name: 'Déconnexion',  action: ()=>handleDisconnect() },
  ]

  return (
    <div className={classes.root}>
       {(location.pathname === "/login" || location.pathname === "/signin" || location.pathname === "/forget") ? <Fragment /> :
      <Fragment> 
        <CssBaseline />
       
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: editMode,
          })}
        >
          <div className={classes.drawerHeader} />
          
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={editMode}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={()=>dispatch({type: 'UPDATE_EDIT_MODE', data: !editMode})}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          <Divider />

          <List>
            {items.map((item) => (
              <ListItem button key={item.name} onClick={item.action}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
              <ListItem button >
              <ListItemIcon><EditIcon/></ListItemIcon>
                <ListItemText primary="Mode édition" />
              <Switch checked={editMode} 
                      onChange={()=>dispatch({type: 'UPDATE_EDIT_MODE', data: !editMode})} 
                      color="primary" />
              </ListItem>
          </List>
        </Drawer>
      </Fragment>}
    </div>
  )
}