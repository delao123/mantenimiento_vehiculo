import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  system: {
    minWidth: 275,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Home(){
  const classes = useStyles();
    const userSignin = useSelector(state => state.userLogin);
    const { userInfo } = userSignin;
    const user = userInfo
   console.log(userInfo);
    useEffect(() => {
        if (userInfo) {
          
        }
        return () => {
          //
        };
      }, [userInfo]);

    return  <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Administrador
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph></Typography>
        <div>
          <h2>Bienvenido {user.name}</h2>
        </div>

          <div className="card"> 
          <Card className={classes.system}>
             <CardContent>
               <CardMedia
               component="img"
               alt="Moon Vacation Getaway"
               height="140"
               image="https://www.toyocosta.com/blog/wp-content/uploads/2018/10/Link_Rav2_Toyo_Octubre_V1-1024x536.jpg"
               title="vehiculos"
              />
              <Typography gutterBottom variant="h5" component="h3" color="primary">
              Disponibilidad Vehiculos
            </Typography>
            <CardActions>
              <Button size="small" color="primary" href="/vehiculos" >
                Ver tabla
              </Button>
            </CardActions>
            </CardContent>
          </Card>
          </div>

          <div className="card"> 
          <Card className={classes.system}>
             <CardContent>
               <CardMedia
               component="img"
               alt="Moon Vacation Getaway"
               height="140"
               image="https://blog.segundamano.mx/wp-content/uploads/2018/10/Blog_autopartes.jpg"
               title="vehiculos"
              />
              <Typography gutterBottom variant="h5" component="h3" color="primary">
              Refacciones
            </Typography>
            <CardActions>
              <Button size="small" color="primary" href="/refacciones" >
                Ver tabla
              </Button>
            </CardActions>
            </CardContent>
          </Card>
          </div>

          <div className="card"> 
          <Card className={classes.system}>
             <CardContent>
               <CardMedia
               component="img"
               alt="Moon Vacation Getaway"
               height="140"
               image="https://empresas.infoempleo.com/hrtrends/media/2020/05/HRTrends-estres-laboral-provocado-por-jefes.jpg"
               title="vehiculos"
              />
              <Typography gutterBottom variant="h5" component="h3" color="primary">
              Trabajadores
            </Typography>
            <CardActions>
              <Button size="small" color="primary" href="/trabajadores" >
                Ver tabla
              </Button>
            </CardActions>
            </CardContent>
          </Card>
          </div>
    
  </main>
    </div>
}
export default Home;