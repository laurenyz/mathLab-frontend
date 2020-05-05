import React from 'react'
import subjectsData from '../subjects.json'
import {connect} from 'react-redux'
import {updateFilterSubject} from '../redux/actions'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
      button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    }));

function SubjectFilter(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


    return(
        <div>
            
       <FormControl className={classes.formControl}>
            <InputLabel id="filterSubject">Subject</InputLabel>
            <Select
            labelId="filter-subject"
            id="filter-subject"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={props.filterSubject}
            name="subject"
            onChange={handleOnChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {alphabetizedSubjects(subjectsData).map(subject => <MenuItem key = {subject.id} value = {subject.name}>{subject.name}</MenuItem>)}
            </Select>
        </FormControl>
    </div>
    )

function handleOnChange(event) {
        props.updateFilterSubject(event.target.value)
    }
}

function alphabetizedSubjects(subjectsData){
  return subjectsData.subjects.sort((a,b) => (a.name>b.name)? 1: -1)
}


const mapStateToProps = state => {
    return{
        filterSubject: state.filterSubject
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateFilterSubject: subject => dispatch(updateFilterSubject(subject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectFilter)





//   return (
//     <div>
//       <Button className={classes.button} onClick={handleOpen}>
//         Open the select
//       </Button>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
//         <Select
//           labelId="demo-controlled-open-select-label"
//           id="demo-controlled-open-select"
//           open={open}
//           onClose={handleClose}
//           onOpen={handleOpen}
//           value={age}
//           onChange={handleChange}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// }