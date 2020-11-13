
export const filter_onlyDigits = (str) => str.replace(/[^0-9]+/g,'')
export const onlyAlpha_lowecase = (str) => (str.replace(/[^a-z0-9]+/g,''))
export const onlyAlpha = (str) => (str.replace(/[^a-zA-Z0-9\-\_\s]+/g,''))
export const isEmpty = (str) => (!str || 0 === str.length);

export const filter_email_chars = (str) => str.replace(/[^0-9a-zA-Z!=@/!#$%&\'*+-/=?^_`.{|}~]+/g,'')

export const verifyPostal = (arg) =>  !(/^([\d]{4}\-[\d]{3})$/.test(arg))

export const isNif = (arg) => !(arg.length == 9)

export const getSetInput = (state,setState) => (key, value) => setState({ ...state, [key]: value })
export const getGetInput = (state) => ((key, value) => state ? state[key] : '' )



export const filterFields = (object,allowed) => {
    return Object.keys(object)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = object[key];
        return obj;
      }, {});      
}

export const ERROR_EMPTY_MSG = 'Campo obrigatorio.';
export const ERROR_INVALID_FIELD = 'Campo invalido.';


export const  validate_email = (value) => {
  var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(value).search (filter) != -1;
}


