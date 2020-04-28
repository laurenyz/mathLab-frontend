import React from 'react'
import subjectsData from '../subjects.json'
import {connect} from 'react-redux'
import {updateFilterSubject} from '../redux/actions'

const SubjectFilter = (props) => {
    return(<div>
        <select name="subject" value = {props.filterSubject} onChange = {handleOnChange}>
            <option value="">SUBJECT</option>
            {subjectsData.subjects.map(subject => <option key = {subject.id} value = {subject.name}>{subject.name}</option>)}
        </select>
    </div>)

    function handleOnChange(event) {
        props.updateFilterSubject(event.target.value)
    }
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