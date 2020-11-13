import { Box, Grid, Container } from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Paper } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    flexGrow: 1,
    paddingTop: '10px',
    paddingBottom: '10px',
    minHeight: '90vh'

  },


  box: {
    flexGrow: 1,
    paddingTop: '20px',
    paddingBottom: '10px',
 //   minHeight: '90vh',
    padding: theme.spacing(1),
    textAlign: 'center',
    border: '1px',
    margin: 'auto',
    backgroundColor: '',

  },
    root: {
      flexGrow: 1,
      paddingTop: '20px'
    },

    field: {
        marginTop: '10px'
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flexGrow: 1,
      },

  }));



export const OneBox = (props) => {
    return (<Grid item  md={3} sm={4} xs={12}>{props.children}</Grid>)
}

export const ThreeBox = (props) => {
  return (<Grid item sm={9} xs={12}>{props.children}</Grid>)
}

export const TwoBox = (props) => {
    return (<Grid item sm={6} xs={12}>{props.children}</Grid>)
}

export const FullBox = (props) => {
    return (<Grid item sm={12} xs={12}>{props.children}</Grid>)
}
  
export const ProductBox = (props) => {
    const classes = useStyles();
    const {image, to} = props
    const {title,headline,description,} = props
    const {promo, colorPromo, colorBgPromo} = props
    const {tagline, colorTagline, colorBgTagline} = props
  
    return (
    
    <Link style={{textDecoration:'none'}} to={to}>
    <Card style={{textAlign: 'center'}}  >
  
      {image ? 
      <CardMedia
          alt="Contemplative Reptile"             
          title="title">
          <img src={image}  style={{paddingLeft: '0px',marginleft: '0px', maxHeight:'180px'}}/>
      </CardMedia>
      : ''}
  
      <CardContent style={{paddingTop:'0px', paddingBottom: '0px'}} > 
      
        {title ?  <Typography variant="h6" >{title}</Typography>: ''}

        {!promo ? 
          <ProductHeadline headline={headline} description={description}/> 
         :
         ''
        } 

  
      </CardContent>

      {promo ?       
         <ProductTagline  tagline={promo} color={colorPromo} bgColor={colorBgPromo} />
         : ''
        } 

  
      { tagline ?   
        <ProductTagline  tagline={tagline} color={colorTagline} bgColor={colorBgTagline} />
     : ''}

    </Card>                  
    </Link>
  
)}


 const ProductHeadline = (props) => {
  const classes = useStyles();
  const {headline, description} = props


 return  ( 
    <Fragment>
    { headline ? 
      <Typography  variant="body2" display="block"  className={classes.houseName}>
      {headline}
      </Typography> 
    : ''}
  
    {description ? 
      <Typography  variant="body2" display="block" gutterBottom >
      {description}
      </Typography>
    : ''} 
   </Fragment>
  )

}

const ProductTagline = (props) => {
  const classes = useStyles();
  const {tagline, color,bgColor} = props
  
  return  ( 
    <Fragment>
        <CardActions style={{backgroundColor: (  (bgColor ? bgColor:  '#0073e6' ) )}}>   
         <Box style={{  flex: 1}}>     
          <Typography variant="h6"   style={{ color:  (color ? color:  'white' )}}>
          {tagline}
         
          </Typography>     
          </Box>   
        </CardActions>
   </Fragment>
  )

}


    export const ImageBox = (props) => {
      const classes = useStyles();
      const {image,tagline,to,colorFlag,colorBgFlag } = props
    
      return (
      <Link style={{textDecoration:'none'}} to={to}>
      <Card raised={false} style={{textAlign: 'center'}}  >
        
      {image ? 
          <CardMedia           
            alt="Contemplative Reptile"             
            title="title"
            raised={false}
            >
          <img src={image}  style={{paddingLeft: '0px',marginTop: '5px',  minHeight:(tagline ? '250px' : '300px'), maxHeight:(tagline ? '250px' : '300px')}}/>
          </CardMedia>

          : ''}
      
    { tagline ?   
        <CardActions style={{backgroundColor: (colorBgFlag ? colorBgFlag : '#f5f5f0') }}>   
         <Box style={{color:"black", textAlign: 'center', alignItems: 'center', flex: 1}}>     
          <Typography variant="h6"   style={{color: (colorFlag ? colorFlag : 'black')}}>
          {tagline}
          </Typography>     
          </Box>   
        </CardActions>
     : ''}
      </Card> 
      </Link>                 
    
)}
  



export const SectionHeader = ({color, bgColor,line, to}) => {

  return (
    <Paper  variant="outlined" style={{marginTop: '20px', backgroundColor: bgColor,padding:'15px 10px 15px 10px ', borderColor: color}}>
    <Typography  variant="h5"  style={{color:color, }}>{line}</Typography>
    </Paper>
  )


}


export const BulletLinkHeader = ({color, bgColor,line, to}) => {

  return (
    <Paper  variant="outlined" style={{marginTop: '20px', backgroundColor: bgColor,padding:'5px 5px 5px 5px', borderColor: 'darkblue'}}>
    <Typography  variant="body2"  style={{color:color, }}>{line}</Typography>
    </Paper>
  )


}



export const BulletLink = ({color, bgColor,line, to}) => {

  return (
    <Paper  variant="outlined" style={{marginTop: '0px', marginBottom: '5px', backgroundColor: bgColor,padding:'5px 5px 5px 5px '}}>
    <Link style={{textDecoration:'none'}} to={to}>  <Typography  variant="body2"  style={{color:color, }}>{line}</Typography> </Link>
    </Paper>
  )


}