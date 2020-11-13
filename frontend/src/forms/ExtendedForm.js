import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from "react";
import MaskedInput from 'react-text-mask';




  export function TextMaskPostalCode(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[ /\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
  
  
  export function TextMaskPhone(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[ /\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/,' ',/\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
  
  
  
  
const withExtendedInput = Component => (props) =>{
    const {name,id,label,required,fullWidth,type,variant,className,disabled,inputProps,InputProps,rowsMax,multiline} = props
    const {get,set,filter,geterrors} = props
  
    const change = (value) => {
      value = filter ? filter(value) : value
      set(name,value)
    }
  
  
    return <Component
      required={required}
      id={id}
      name={name}
      label={label}
      type={type}
      fullWidth={fullWidth}
      value={get(name)}
      onChange={event => change(event.target.value)}  
      error={geterrors(name) != null} 
      helperText={geterrors(name)}  
      InputProps={InputProps}
      inputProps={inputProps}
      variant={variant}
      className={className}
      disabled={disabled}
      rowsMax={rowsMax}
      multiline

     
      
    />
  }
  
  
  export const TextFieldExtended = withExtendedInput(TextField)

  export const PostalCodeInput = (props) => {
    const {name,get,set,filter,getErrors} = props

    const change = (value) => {
        set(name,value)
      }

    return (
        <Fragment>
        <Input  value={get(name,'')}    onChange={event => change(event.target.value)}  error={getErrors(name) != null}  inputComponent={TextMaskPostalCode} />
        <p class="MuiFormHelperText-root Mui-error" style={{color: 'red'}}>{getErrors(name)}</p>
        </Fragment>
    )

  }


  export const PhoneNumberInput = (props) => {
    const {name,id,label,error,required,fullWidth,type} = props
    const {get,set,filter,geterrors} = props

    const change = (value) => set(name,value) 

    return (
        <Fragment>
        <p class="MuiFormLabel-root MuiInputLabel-root Mui-required Mui-required">{label}{required ? ' *' : ''}</p>
        <Input value={get(name,'')}    onChange={event => change(event.target.value)}  error={geterrors(name) != null}  inputComponent={TextMaskPhone}/>
        <p class="MuiFormHelperText-root Mui-error" style={{color: 'red'}}>{geterrors(name)}</p>
        </Fragment>
    )

  }


