import moment from 'moment'

function validCpf(cpf) {
  let sum = 0
  let mod
  if (cpf === '' || cpf === '00000000000') return true
  if (cpf.length !== 11) return false
  if (
    cpf.match(/\d/g).filter((item, pos, self) => {
      return self.indexOf(item) === pos
    }).length === 1
  )
    return false

  for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i)

  mod = (sum * 10) % 11

  if (mod === 10 || mod === 11) mod = 0
  if (mod !== parseInt(cpf.substring(9, 10), 10)) return false

  sum = 0
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (12 - i)
  mod = (sum * 10) % 11

  if (mod === 10 || mod === 11) mod = 0
  if (mod !== parseInt(cpf.substring(10, 11), 10)) return false
  return true
}

function validCNPJ(cnpj) {
  let b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  if ((cnpj = cnpj.replace(/[^\d]/g, '')).length !== 14) return false

  if (/0{14}/.test(cnpj)) return false

  for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
  if (Number(cnpj[12]) !== ((n %= 11) < 2 ? 0 : 11 - n)) return false

  for (var x = 0, y = 0; x <= 12; y += cnpj[x] * b[x++]);
  if (Number(cnpj[13]) !== ((y %= 11) < 2 ? 0 : 11 - y)) return false
  return true
}

function validCpfCnpj(cpfCnpj) {
  if (!cpfCnpj) return
  cpfCnpj = cpfCnpj.replace(/[\D]/g, '')
  if (!validCpf(cpfCnpj) && !validCNPJ(cpfCnpj)) return 'CPF/CNPJ Inválido'
  return null
}

export const Validators = {
  required: value => (value ? undefined : 'Este campo é requerido'),

  maxLength: max => value => (value && value.length > max ? `Não pode ter mais que ${max} caracteres` : undefined),

  minLength: min => value => (value && value.length < min ? `Não pode ter menos que  ${min} caracteres` : undefined),

  number: value => (value && isNaN(Number(value)) ? 'Deve ser um número' : undefined),

  minValue: min => value => (value && value < min ? `Deve ser maior ou igual a ${min}` : undefined),

  maxValue: max => value => (value && value > max ? `Deve ser menor ou igual a  ${max}` : undefined),

  password: value => {
    const errors = []
    if (!value || value.length < 8) errors.push('SENHA_REQUERIDA')
    if (!value || value.match(/[a-z]/) === null) errors.push('MINUSCULA_REQUERIDA')
    if (!value || value.match(/[A-Z]/) === null) errors.push('MAIUSCULA_REQUERIDA')
    if (!value || value.match(/[\d]/) === null) errors.push('NUMERICO_REQUERIDO')
    if (!value || value.match(/[^A-Za-z0-9]/) === null) errors.push('ESPECIAL_REQUERIDO')
    //this.props.password === this.props.password.senhaConfirmacao
    if (errors.length) return errors
    return null
  },

  confirmPassword: ({ senha, senhaConfirmacao }) => {
    const errors = []
    if (!senha || senha.length < 8) errors.push('SENHA_REQUERIDA')
    if (!senha || senha.match(/[a-z]/) === null) errors.push('MINUSCULA_REQUERIDA')
    if (!senha || senha.match(/[A-Z]/) === null) errors.push('MAIUSCULA_REQUERIDA')
    if (!senha || senha.match(/[\d]/) === null) errors.push('NUMERICO_REQUERIDO')
    if (!senha || senha.match(/[^A-Za-z0-9]/) === null) errors.push('ESPECIAL_REQUERIDO')
    if (!senha || senha !== senhaConfirmacao) errors.push('SENHAS_DIVERGENTES')
    if (errors.length) return { senha: errors, senhaConfirmacao: errors }
    return null
  },

  email: value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined,

  tooOld: value => (value && value > 65 ? 'You might be too old for this' : undefined),

  aol: value => (value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined),

  cpfCnpj: value => validCpfCnpj(value),

  phone: value => (value && value.length < 13 ? 'Número inválido' : undefined),

  cellphone: value => (value && value.length < 14 ? 'Número inválido' : undefined),

  cep: value => (value && value.length < 9 && !/^[0-9]{5}-[0-9]{3}$/i.test(value) ? 'CEP Inválido' : undefined),

  time: value =>
    value && value.length < 9 && !/^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/.test(value) ? 'Horário inválido' : undefined,

  datetime: value =>
    !(value && value.length === 16 && moment(value, 'DD/MM/YYYY HH:mm').isValid()) ? 'Data/Hora Inválida' : undefined,

  date: value =>
    !(value && value.length === 10 && moment(value, 'DD/MM/YYYY').isValid()) ? 'Data/Hora Inválida' : undefined
}
