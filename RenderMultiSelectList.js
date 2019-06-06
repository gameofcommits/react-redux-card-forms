import React from 'react'
import { GridContainer, GridItem, CustomInput } from '..'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { FormHelperText } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import Clear from '@material-ui/icons/Clear'
import Check from '@material-ui/icons/Check'
import customInputStyle from '../../assets/jss/material-dashboard-react/customInputStyle'

class RenderMultiSelectListClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.meta && props.meta.initial ? props.meta.initial : [],
      searchOptions: '',
      searchSelected: ''
    }
  }

  onClearChanges(ev) {
    ev.log(ev)
  }

  add(value) {
    const selected = [...this.state.selected, value].sort()
    this.setState({ selected })
    this.update(selected)
  }

  addAll() {
    const selected = [...this.props.options.map(e => e.value)].sort()
    this.setState({ selected })
    this.update(selected)
  }

  remove(value) {
    let selected = [...this.state.selected].filter(e => e !== value)
    this.setState({ selected })
    selected = selected.length > 0 ? selected : null
    this.update(selected)
  }

  removeAll() {
    const selected = []
    this.setState({ selected })
    this.update(null)
  }

  update(selected) {
    const { meta, change, input } = this.props
    change(meta.form, input.name, selected)
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.input.value) !== JSON.stringify(this.state.selected)) {
      this.setState({ selected: nextProps.input.value })
    }
  }

  componentDidUpdate(nextProps, nextState) {
    return JSON.stringify(nextState.selected) !== JSON.stringify(this.state.selected)
  }

  render() {
    if (!this.props.options) return null
    const { classes, meta } = this.props
    let error = meta ? meta.error : undefined
    let touched = meta ? meta.touched : undefined
    let success = meta ? meta.success : undefined

    return (
      <fieldset style={styles.fieldset}>
        <legend style={styles.legend}>{this.props.label.toUpperCase() || 'DADOS DA ENTIDADE'}</legend>
        <GridContainer>
          <GridItem md={6} style={styles.columns}>
            <CustomInput
              inputSearch={true}
              input={{ placeholder: 'Digite para Localizar' }}
              onChange={e => this.setState({ searchOptions: e.target.value })}
              iconProps={{
                children: <Search />
              }}
            />
            <div style={styles.box}>
              {this.props.options
                .filter(e => this.state.selected.indexOf(e.value) === -1)
                .filter(e => ('' + e.label).toUpperCase().indexOf(this.state.searchOptions.toUpperCase()) >= 0)
                .sort((a, b) => ('' + a.label).localeCompare(b.label))
                .map(e => (
                  <Button fullWidth={true} key={e.value} onClick={() => this.add(e.value)}>
                    <span style={styles.itemBox}>{e.label}</span>
                  </Button>
                ))}
            </div>
            <Button fullWidth={true} onClick={() => this.addAll()}>
              Adicionar Todos
            </Button>
          </GridItem>
          <GridItem md={6}>
            <CustomInput
              inputSearch={true}
              input={{ placeholder: 'Digite para Localizar' }}
              onChange={e => this.setState({ searchSelected: e.target.value })}
              iconProps={{
                children: <Search />
              }}
            />
            <div style={styles.box}>
              {this.props.options
                .filter(e => this.state.selected.indexOf(e.value) >= 0)
                .filter(e => ('' + e.label).toUpperCase().indexOf(this.state.searchSelected.toUpperCase()) >= 0)
                .sort((a, b) => ('' + a.label).localeCompare(b.label))
                .map(e => (
                  <Button fullWidth={true} key={e.value} onClick={() => this.remove(e.value)}>
                    <span style={styles.itemBox}>{e.label}</span>
                  </Button>
                ))}
            </div>
            <Button fullWidth={true} onClick={() => this.removeAll()}>
              Remover Todos
            </Button>
          </GridItem>
          <GridItem md={12}>
            {error && touched ? (
              <Clear className={classes.labelRootError + ' ' + classes.labelRootErrorAdjust} />
            ) : success && !error ? (
              <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
            ) : null}
            {error && touched ? (
              <FormHelperText className={classes.textError + ' ' + classes.labelRootError} id="name-error-text">
                {error}
              </FormHelperText>
            ) : success ? (
              <Check
                className={classes.feedback + ' ' + classes.labelRootSuccess + ' ' + classes.labelRootErrorAdjust}
              />
            ) : null}
          </GridItem>
        </GridContainer>
      </fieldset>
    )
  }
}

const styles = {
  help: {
    textAlign: 'center',
    color: '#999',
    fontSize: '13px',
    display: 'block'
  },
  container: {
    paddingTop: 20
  },
  containerZeroPadding: {
    paddingLeft: 0,
    paddingTop: 5
  },
  fieldset: {
    width: '100%',
    border: '1px dotted #ccc',
    borderRadius: '5px',
    marginBottom: 10
  },
  legend: {
    marginBottom: '5px',
    fontSize: '15px',
    color: '#999'
  },
  buttonsContainer: {
    textAlign: 'right'
  },
  box: {
    backgroundColor: '#f6f6f6',
    padding: '10px',
    border: '1px solid #ddd',
    margin: '5px -10px',
    height: '140px',
    overflow: 'auto'
  },
  itemBox: {
    textAlign: 'left',
    width: '100%'
  },
  dense: {
    marginTop: 16
  },
  inputSearch: {
    marginBottom: '5px'
  },
  labelRootErrorAdjust: {
    float: 'right',
    margin: '-6px 0'
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ change }, dispatch)

const RenderMultiSelectList = connect(
  null,
  mapDispatchToProps
)(withStyles({ ...customInputStyle, ...styles })(RenderMultiSelectListClass))
export { RenderMultiSelectList }
