export const Normalizes = {
  normalizeCell: (value, previousValue) => {
    if (!value) return value
    const onlyNums = value.replace(/[^\d]/g, '')
    if (!previousValue || value.length > previousValue.length) {
      if (onlyNums.length === 1) return '(' + onlyNums
      if (onlyNums.length === 2) return '(' + onlyNums + ')'

      if (onlyNums.length >= 3 && onlyNums.length < 7) return '(' + onlyNums.slice(0, 2) + ')' + onlyNums.slice(2)
      if (onlyNums.length >= 7)
        return '(' + onlyNums.slice(0, 2) + ')' + onlyNums.slice(2, 7) + '-' + onlyNums.slice(7, 11)
    }
    if (onlyNums.length < 1) return onlyNums
    if (onlyNums.length <= 2) return '(' + onlyNums
    if (onlyNums.length >= 3 && onlyNums.length < 8) return '(' + onlyNums.slice(0, 2) + ')' + onlyNums.slice(2)
    return '(' + onlyNums.slice(0, 2) + ')' + onlyNums.slice(2, 7) + '-' + onlyNums.slice(7, 11)
  },

  normalizePhone: value => {
    if (!value) return value
    const onlyNums = value.replace(/[^\d]/g, '')
    const ddd = onlyNums.slice(0, 2)
    const grupo1 = onlyNums.slice(2, 6)
    const grupo2 = onlyNums.slice(6, 10)

    let tel = ddd ? '(' + ddd : ''
    tel += ddd.length === 2 && grupo1 ? ')' : ''
    tel += grupo1
    tel += grupo1.length === 4 && grupo2 ? '-' : ''
    tel += grupo2
    return tel
  },

  date: value => {
    if (!value) return value
    const onlyNums = value.replace(/[^\d]/g, '')
    const term1 = onlyNums.slice(0, 2)
    const term2 = onlyNums.slice(2, 4)
    const term3 = onlyNums.slice(4, 8)

    let date = term1 ? term1 : ''
    date += term1.length === 2 && term2 ? '/' : ''
    date += term2
    date += term2.length === 2 && term3 ? '/' : ''
    date += term3
    return date
  },

  anoMes: value => {
    if (!value) return value
    const onlyNums = value.replace(/[^\d]/g, '')

    const term1 = onlyNums.slice(0, 4)
    const term2 = onlyNums.slice(4, 6)

    let date = term1 ? term1 : ''
    date += term1.length === 4 && term2 ? '/' : ''
    date += term2
    return date
  },

  cep: value => {
    if (!value) return value
    const onlyNums = value.replace(/[^\d]/g, '')
    const term1 = onlyNums.slice(0, 5)
    const term2 = onlyNums.slice(5, 8)

    let cep = term1 ? term1 : ''
    cep += term1.length === 5 && term2 ? '-' : ''
    cep += term2
    return cep
  },

  datetime: value => {
    if (!value) return value
    const onlyNums = value.replace(/[^\d]/g, '')
    const term1 = onlyNums.slice(0, 2)
    const term2 = onlyNums.slice(2, 4)
    const term3 = onlyNums.slice(4, 8)
    const term4 = onlyNums.slice(8, 10)
    const term5 = onlyNums.slice(10, 12)

    let datetime = term1 ? term1 : ''
    datetime += term1.length === 2 && term2 ? '/' : ''
    datetime += term2
    datetime += term2.length === 2 && term3 ? '/' : ''
    datetime += term3
    datetime += term3.length === 4 && term4 ? ' ' : ''
    datetime += term4
    datetime += term4.length === 2 && term5 ? ':' : ''
    datetime += term5
    return datetime
  },

  time: value => {
    if (!value) return value
    const onlyNums = value.replace(/[^\d]/g, '')

    const term1 = onlyNums.slice(0, 2)
    const term2 = onlyNums.slice(2, 4)

    let time = term1 ? term1 : ''
    time += term1.length === 2 && term2 ? ':' : ''
    time += term2
    return time
  },

  cpfCnpj: value => {
    if (!value) return value
    const onlyNums = value.replace(/[^\d]/g, '')

    if (value.length <= 14) {
      const term1 = onlyNums.slice(0, 3)
      const term2 = onlyNums.slice(3, 6)
      const term3 = onlyNums.slice(6, 9)
      const term4 = onlyNums.slice(9, 11)

      let cpfCnpj = term1 ? term1 : ''

      cpfCnpj += term1.length === 3 && term2 ? '.' : ''
      cpfCnpj += term2
      cpfCnpj += term2.length === 3 && term3 ? '.' : ''
      cpfCnpj += term3
      cpfCnpj += term3.length === 3 && term4 ? '-' : ''
      cpfCnpj += term4
      return cpfCnpj
    } else {
      const term1 = onlyNums.slice(0, 2)
      const term2 = onlyNums.slice(2, 5)
      const term3 = onlyNums.slice(5, 8)
      const term4 = onlyNums.slice(8, 12)
      const term5 = onlyNums.slice(12, 14)

      let cpfCnpj = term1 ? term1 : ''

      cpfCnpj += term1.length === 2 && term2 ? '.' : ''
      cpfCnpj += term2
      cpfCnpj += term2.length === 3 && term3 ? '.' : ''
      cpfCnpj += term3
      cpfCnpj += term3.length === 3 && term4 ? '/' : ''
      cpfCnpj += term4
      cpfCnpj += term4.length === 4 && term5 ? '-' : ''
      cpfCnpj += term5
      return cpfCnpj
    }
  },

  onlyNums: value => (value ? value.replace(/[\D]/g, '') : ''),

  float: value => {
    if (!value) return value
    let int = Number(value.replace(/[\D]/g, ''))
    if (int < 100) int = ('000' + int).slice(-3)

    let tmp = int + ''

    tmp = tmp.replace(/([0-9]{2})$/g, ',$1')
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    if (tmp.length > 10) return
    return tmp
  },

  money: value => {
    if (!value) return value
    let int = Number(value.replace(/[\D]/g, ''))
    if (int < 100) int = ('000' + int).slice(-3)

    let tmp = int + ''

    tmp = tmp.replace(/([0-9]{2})$/g, ',$1')
    if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    if (tmp.length > 10) return
    return 'R$ ' + tmp
  },
}
