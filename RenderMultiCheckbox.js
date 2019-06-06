import React from 'react'

import { Check } from '@material-ui/icons'
import { FormControlLabel, withStyles, Checkbox } from '@material-ui/core'

import GridItem from '../Grid/GridItem.jsx'
import GridContainer from '../Grid/GridContainer.jsx'
import customCheckboxRadioSwitch from '../../assets/jss/material-dashboard-react/customCheckboxRadioSwitch'

class MultiCheckBoxClass extends React.PureComponent {
  change(item) {
    const { fields } = this.props
    const pos = fields.getAll() && fields.getAll().indexOf(item)
    if (pos >= 0) fields.remove(pos)
    else fields.push(item)
  }

  render() {
    let { classes, getLabel, getValue, options, getGroup, vertical, fields } = this.props
    let currentGroup
    if (!options) return null
    let arr = options.map(o => getValue(o)).filter(o => (fields.getAll() ? !fields.getAll().includes(o) : []))

    return (
      <GridContainer>
        {options.map(opt => {
          return [
            getGroup && getGroup(opt) !== currentGroup && (
              <GridItem md={12} key={'0'}>
                <h4 className="checkbox-group-title">{(currentGroup = getGroup(opt))}</h4>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={arr.length === 0 ? true : false}
                      onChange={() => (arr.length === 0 ? fields.removeAll() : arr.forEach(a => fields.push(a)))}
                      tabIndex={-1}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{ checked: classes.checked }}
                    />
                  }
                  classes={{ label: classes.label }}
                  label="Todos"
                />
              </GridItem>
            ),
            <GridItem md={vertical ? 12 : 3} key={'1'}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fields.getAll() && fields.getAll().indexOf(getValue(opt)) >= 0 ? true : false}
                    onChange={() => this.change(getValue(opt))}
                    tabIndex={-1}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{ checked: classes.checked }}
                  />
                }
                classes={{ label: classes.label }}
                label={getLabel(opt)}
              />
            </GridItem>
          ]
        })}
      </GridContainer>
    )
  }
}

const RenderMultiCheckbox = withStyles(customCheckboxRadioSwitch)(MultiCheckBoxClass)
export { RenderMultiCheckbox }
