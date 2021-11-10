export const formatterDate = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '').replace(/(\d{4})(\d{2})(\d{2})/g, '$3/$2/$1')
}

export const formatterNumberOnly = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '')
}

export const formatterCEP = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '').replace(/(\d{5})(\d{3})/g, '$1-$2').substr(0, 9)
}

export const formatterLetterOnly = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/\s+/g, ' ').replace(/[^a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/g, '')
}

export const formatterPhone = (value = '') => {
  if (!value) return ''
  const phone = formatterNumberOnly(value)

  if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3')
  }

  return phone
    .substr(0, 11)
    .replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3')
}

export const formatterCPForCNPJ = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  if (value?.length >= 12) {
    return value.replace(/[^0-9]+/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
  }

  return value.replace(/[^0-9]+/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

export const formatterCNPJ = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
}

export const formatterCPF = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

export const formatterRestrictedCPF = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  const str = `00000000${value}`
  const newValue = str.substr(-11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

  const [one, two, three, four] = newValue.replace(/[^0-9]+/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1-$2-$3-$4').split('-')

  const joined = `${one}. ${two.replace(/[0-9]/g, '* ')}. ${three.replace(/[0-9]/g, '* ')}-${four}`

  return joined
}

export const formatterRestrictedCNPJ = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  const str = `00000000${value}`
  const newValue = str.substr(-14).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

  const [one, two, three, four, five] = newValue.replace(/[^0-9]+/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1-$2-$3-$4-$5').split('-')

  const joined = `${one}. ${two.replace(/[0-9]/g, '* ')}. ${three.replace(/[0-9]/g, '* ')}/${four}-${five}`

  return joined
}

export const formatterRestrictedForeign = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  const toHide = value.substring(value.length - (value.length / 2))
  const [one, two] = value.split(toHide)
  const joined = `${one}${toHide.replace(/[a-z0-9]/g, '*')}${two}`
  return joined
}

export const formatterRestrictedEmail = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  const [name] = value.split('@')
  const toHide = name.substring(name.length - (name.length / 2))
  const [one, two] = value.split(toHide)
  const joined = `${one}${toHide.replace(/[a-z0-9]/g, '*')}${two}`

  return joined
}

export const formatterDownCase = (value = '') => (
  value.trim().toLowerCase()
)

export const formatterCleanedPhoneNumber = (value = '') => (
  formatterNumberOnly(value).substr(0, 11)
)

export const formatterMoney = (value = '') => {
  const money = Number(value).toFixed(2)
  const newValue = formatterNumberOnly(money)

  switch (true) {
    case (newValue.length <= 2):
      return newValue.replace(/(\d{1,2})/g, '$1')
    case (newValue.length >= 3 && newValue.length <= 5):
      return newValue.replace(/(\d{1,3})(\d{2})/g, '$1,$2')
    case (newValue.length >= 6 && newValue.length <= 8):
      return newValue.replace(/(\d{1,3})(\d{3})(\d{2})/g, '$1.$2,$3')
    case (newValue.length >= 9 && newValue.length <= 11):
      return newValue.replace(/(\d{1,3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3,$4')
    case (newValue.length >= 12 && newValue.length <= 14):
      return newValue.replace(/(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3.$4,$5')
    case (newValue.length >= 15):
      return newValue.replace(/(\d{1})(\d{3})(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3.$4.$5,$6')
    default:
      return newValue
  }
}

export const formatUserStore = (store = '') => (
  store.split('_')[0]
)