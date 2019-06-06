import React from 'react'
/*
import TextField from 'redux-form-material-ui/TextField'
import Checkbox from 'redux-form-material-ui/Checkbox'
import Toggle from 'redux-form-material-ui/Toggle'
import SelectField from 'redux-form-material-ui/SelectField'
import RadioButtonGroup from 'redux-form-material-ui/RadioButtonGroup'
import DatePicker from 'redux-form-material-ui/DatePicker'
*/
const RenderHidden = props => (<input type="hidden" {...props.input} {...props.meta} />)
export { RenderHidden }
