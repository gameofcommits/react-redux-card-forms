import React from 'react'
import customCheckboxRadioSwitch from '../../assets/jss/material-dashboard-react/customCheckboxRadioSwitch'
//import GridItem from '../Grid/GridItem.jsx'
import { Check } from '@material-ui/icons'
import { FormControlLabel, withStyles, Checkbox } from '@material-ui/core'

class CheckBoxClass extends React.Component {
  render() {
    let { classes, label, input, vertical } = this.props
    return (
      <FormControlLabel
        style={{ marginTop: vertical ? 20 : 0 }}
        control={
          <Checkbox
            checked={input.checked}
            onChange={input.onChange}
            tabIndex={-1}
            checkedIcon={<Check className={classes.checkedIcon} />}
            icon={<Check className={classes.uncheckedIcon} />}
            classes={{ checked: classes.checked }}
          />
        }
        classes={{ label: classes.label }}
        label={label}
      />
    )
  }
}

const RenderCheckbox = withStyles(customCheckboxRadioSwitch)(CheckBoxClass)
export { RenderCheckbox }
