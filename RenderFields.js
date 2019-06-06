import React from 'react'
import GridItem from '../Grid/GridItem.jsx'
import GridContainer from '../Grid/GridContainer.jsx'
import { Delete } from '@material-ui/icons'
import { Field, FieldArray } from 'redux-form'
import { RenderMultiSelectList } from './RenderMultiSelectList.js'
import { Validators, Normalizes } from './index'
import { Button, IconButtonCustom, CustomInput } from '..'
import { RenderCheckbox, RenderMultiCheckbox, RenderSelect, RenderHidden } from './'

class RenderFields extends React.PureComponent {
  render() {
    const { fields } = this.props
    let currentGroup = null
    return (
      <GridContainer>
        {fields.map((f, idx) => {
          if (f.condition !== undefined && (f.condition === false || f.condition() === false)) return null
          if (f.content) return f.content
          if (f.fields) {
            return (
              <GridItem md={12} {...f.grid} key={idx}>
                <FieldArray name={f.name} component={props => this.renderFieldsArray(f, props)} />
              </GridItem>
            )
          }
          if (f.type === 'checkbox' && f.options && f.options.length > 0) {
            return f.options.map(opt => {
              return [
                f.getGroup && f.getGroup(opt) !== currentGroup && (
                  <GridItem md={12} key={'0'}>
                    <h4 className="checkbox-group-title">{(currentGroup = f.getGroup(opt))}</h4>
                  </GridItem>
                ),
                <GridItem md={f.vertical ? 12 : 3} key={'1'}>
                  <Field
                    {...f}
                    key={idx}
                    type={f.type}
                    label={f.getLabel(opt)}
                    value={f.getValue(opt)}
                    component={this.getRenderer(f)}
                    validate={this.getValidators(f)}
                    name={`${f.name}[${f.getValue(opt)}]`}
                  />
                </GridItem>
              ]
            })
          }
          if (f.type === 'multicheckbox' && f.options) {
            return (
              <GridItem md={12} {...f.grid} key={idx}>
                <FieldArray
                  {...f}
                  key={idx}
                  labelText={f.label}
                  component={this.getRenderer(f)}
                  validate={this.getValidators(f)}
                  formControlProps={{ fullWidth: true }}
                  iconProps={{ children: f.icon ? <f.icon /> : null }}
                  normalize={(value, previousValue, allValues, previousAllValues) =>
                    this.getNormalizes(f, value, previousValue, allValues, previousAllValues)
                  }
                />
              </GridItem>
            )
          }
          if (f.type === 'multiSelectList' && f.options) {
            return this.renderField(f, idx)
          }
          return (
            <GridItem md={12} {...f.grid} key={idx}>
              {this.renderField(f, idx)}
            </GridItem>
          )
        })}
      </GridContainer>
    )
  }

  renderFieldsArray(fieldArray, props) {
    const { fields } = props
    return [
      <Button
        size="sm"
        key={`addButton_${fieldArray.fields.name}`}
        color={fieldArray.addProperts && fieldArray.addProperts.color ? fieldArray.addProperts.color : 'primary'}
        onClick={() => fields.push({})}
      >
        {fieldArray.addProperts.addLabel ? fieldArray.addProperts.addLabel : 'add'}
      </Button>,
      <GridContainer key={`containerFieldsArray_${fieldArray.name}`}>
        {fields.map((f, i) => [
          fieldArray.fields.map((fa, j) => (
            <GridItem md={11} {...fa.grid} key={j}>
              {this.renderField({ ...fa, name: `${f}.${fa.name}` }, j)}
            </GridItem>
          )),
          <GridItem md={1} key={i}>
            <IconButtonCustom size="sm" style={{ marginTop: 25 }} color="danger" onClick={() => fields.remove(i)}>
              <Delete />
            </IconButtonCustom>
          </GridItem>
        ])}
      </GridContainer>
    ]
  }

  renderField(f, idx) {
    return (
      <Field
        {...f}
        key={idx}
        component={this.getRenderer(f)}
        validate={this.getValidators(f)}
        iconProps={{ children: f.icon && <f.icon /> }}
        normalize={(value, previousValue, allValues, previousAllValues) =>
          this.getNormalizes(f, value, previousValue, allValues, previousAllValues)
        }
      />
    )
  }

  getRenderer(f) {
    if (f.renderer) return f.renderer
    if (f.type === 'select') return RenderSelect
    if (f.type === 'hidden') return RenderHidden
    if (f.type === 'checkbox') return RenderCheckbox
    if (f.type === 'multicheckbox') return RenderMultiCheckbox
    if (f.type === 'multiSelectList') return RenderMultiSelectList
    return CustomInput
  }

  getValidators(campo) {
    const arrayValidators = []
    if (campo.validators) campo.validators.forEach(v => arrayValidators.push(typeof v === 'string' ? Validators[v] : v))
    return arrayValidators
  }

  getNormalizes(f, value, previousValue, allValues, previousAllValues) {
    if (f.normalize) value = Normalizes[f.normalize](value, previousValue, allValues, previousAllValues)
    if (['password', 'select', 'multicheckbox', 'file'].indexOf(f.type) >= 0) return value
    if (['email'].indexOf(f.type) >= 0) return value.toLowerCase()
    return value && !Number(value) ? value.toUpperCase() : value
  }
}

export default RenderFields
