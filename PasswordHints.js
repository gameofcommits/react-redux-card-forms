import React from 'react'
//import { FormGroup, Input, Label, Col } from 'reactstrap'

const errors = [
  ['SENHA_REQUERIDA', 'A senha deve ter pelo menos 8 (oito) caracteres.'],
  ['MINUSCULA_REQUERIDA', 'A senha deve conter pelo menos uma letra MINÚSCULA.'],
  ['MAIUSCULA_REQUERIDA', 'A senha deve conter pelo menos uma letra MAIÚSCULA.'],
  ['NUMERICO_REQUERIDO', 'A senha deve conter pelo menos um NÚMERO.'],
  ['ESPECIAL_REQUERIDO', 'A senha deve conter pelo menos um CARACTERE ESPECIAL (ex: !@#$).'],
  ['SENHAS_DIVERGENTES', 'A confirmação de senha não coincide.']
]

class PasswordHints extends React.Component {
  render() {
    return (
      <div>
        <ul className="list-checks-password">{errors.map(item => this.renderHint(item[0], item[1]))}</ul>
      </div>
    )
  }

  renderHint(error, message) {
    if (this.hasError(error)) {
      return (
        <li key={error}>
          <i className="fa fa-times" style={{ color: 'red' }} /> {` ${message}`}
        </li>
      )
    }
    return (
      <li key={error}>
        <i className="fa fa-check" style={{ color: 'green' }} /> {` ${message}`}
      </li>
    )
  }

  hasError(error) {
    return this.props.errors && this.props.errors.indexOf(error) >= 0
  }
}

export { PasswordHints }
