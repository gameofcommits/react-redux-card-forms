/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import customInputStyle from '../../assets/jss/material-dashboard-react/customInputStyle'
import cx from 'classnames'
import { Check } from '@material-ui/icons'
import { FormHelperText } from '@material-ui/core'

const styles = theme => ({
  ...customInputStyle,
  root: {
    flexGrow: 1,
    height: 60,
    marginTop: 17,
    'min-width': '150px',
  },
  input: {
    display: 'flex',
    marginBottom: -7,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    marginTop: theme.spacing.unit,
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  optionMenu: {
    zIndex: 150,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
})

function NoOptionsMessage(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        className: props.selectProps.textFieldProps.underline,
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      className={props.selectProps.classes.optionMenu}
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={event => {
        props.removeProps.onClick()
        props.removeProps.onMouseDown(event)
      }}
    />
  )
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
  Menu,
}

class IntegrationReactSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      single: props.input.value || null,
      multi: null,
    }
  }

  handleChange = name => value => {
    //console.log(name)
    //console.log(value)
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { classes, theme, multi, label, meta, selects: opts, placeholder, input, disabled } = this.props
    let error = meta ? meta.error : undefined
    let touched = meta ? meta.touched : undefined
    let success = meta ? meta.success : undefined

    const selects = [{ value: null, label: placeholder ? placeholder : 'SELECIONE' }, ...opts]

    const labelClasses = cx({
      [' ' + classes.labelRootError]: error && touched,
      [' ' + classes.labelRootSuccess]: success && !error,
      [' ' + classes.labelRoot]: !error && touched,
    })
    const underlineClasses = cx({
      [classes.underlineError]: error && touched,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true,
    })
    // const marginTop = cx({
    //   [classes.marginTop]: label === undefined,
    // })

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
      }),
    }
    if (!selects || selects.length === 0) return null
    if (multi) {
      return (
        <div className={classes.root}>
          <NoSsr>
            <Select
              {...input}
              classes={classes}
              styles={selectStyles}
              textFieldProps={{
                label: label,
                InputLabelProps: {
                  className: classes.labelCustom + ' ' + labelClasses,
                  shrink: true,
                },
                underline: underlineClasses,
              }}
              options={selects}
              components={components}
              value={this.state.multi}
              onChange={this.handleChange('multi')}
              placeholder={placeholder || 'SELECIONE'}
              isMulti
            />
          </NoSsr>
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            isDisabled={disabled || false}
            classes={classes}
            textFieldProps={{
              label: label,
              InputLabelProps: {
                className: classes.labelCustom + ' ' + labelClasses,
                shrink: true,
              },
              underline: underlineClasses,
            }}
            styles={selectStyles}
            options={selects}
            components={components}
            value={input.value ? selects.filter(i => i.value === input.value).pop() : null}
            onChange={event => input.onChange(event.value)}
            placeholder={placeholder || 'SELECIONE'}
          />
        </NoSsr>
        {/* {error && touched ? (
          <Clear className={classes.feedback + ' ' + classes.labelRootError} />
        ) : success && !error ? (
          <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
        ) : null} */}
        {error && touched ? (
          <FormHelperText className={classes.textError + ' ' + classes.labelRootError} id="name-error-text">
            {error}
          </FormHelperText>
        ) : success ? (
          <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
        ) : null}
      </div>
    )
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const RenderSelect = withStyles(styles, { withTheme: true })(IntegrationReactSelect)
export { RenderSelect }
