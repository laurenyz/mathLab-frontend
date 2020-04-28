import React from 'react'
import {connect} from 'react-redux'
import {updateSearchTerm} from '../redux/actions'


const SearchBar = (props) => {
   
   return(<div>
        SearchBar
        <input type = "text" onChange = {handleOnChange} value = {props.searchTerm}></input>
    </div>)

function handleOnChange(event) {
    props.updateSearchTerm(event.target.value.toLowerCase())
}

}

const mapStateToProps = state => {
    return{
        searchTerm: state.searchTerm
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateSearchTerm: searchTerm => dispatch(updateSearchTerm(searchTerm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)