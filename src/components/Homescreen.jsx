import React from 'react'
import Grid from '@material-ui/core/Grid'

const Homescreen = () => {
    return(<div>
        <Grid container justify="center" alignItems="flex-end" spacing={1} style={{marginTop: "20px"}}> 
            <Grid item style={{marginBottom: "60px"}}>
            <img src={require(`../assets/images/homescreen_m_logo.png`)}></img>
            </Grid>
            <Grid item>
            <img src={require(`../assets/images/homescreen_athlab_logo.png`)}></img>
            </Grid>
        </Grid>
        
        
    </div>)
}

export default Homescreen