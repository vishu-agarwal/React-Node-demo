import { useState } from 'react'
// pass argument as function
const useInput = (validateInput) => {


    const [enterValue, setenterValue] = useState('');
    const [isTouch, setisTouch] = useState(false);
    // const [] = useState();

    const valueIsValid = validateInput(enterValue);
    const hasError = !valueIsValid && isTouch;

    const inputChangeHandler = (e) => {
        setenterValue(e.target.value);
    }

    const inputBlurHandler = (e) => {
        setisTouch(true);
    }

    const reset = () => {
        setenterValue('');
        setisTouch(false);
    }
    return (
        { hasError, value: enterValue, valueIsValid, inputBlurHandler, inputChangeHandler, reset }
    )
}

export default useInput