//otpInputs.js
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import SettingsStore from "@/store/SettingsStore";
import { Button, Input, Spacer, Text, useInput } from "@nextui-org/react";
import { styledToast } from '@/utils/HelperUtil'
import { COLOR } from "@/constants/style";
// import "from './otpInput.css'; //remove this line if you are using react

//Our parent component
const OTPInputGroup = () => {
    const router = useRouter()
    // console.log(router)

  const { value, reset, bindings } = useInput("");

    let PIN = window.localStorage.getItem("PIN")
    // console.log({ PIN })
    //state to store all input boxes    
    const [inputValues, setInputValues] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        // Add more input values here
    });
    const [pinValue, setPinValue] = useState('')
    //this function updates the value of the state inputValues
    const handleInputChange = (inputId: any, value: any) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [inputId]: value,
        }));
    };
    //this function processes form submission
    // const handleSubmit = () => {
    //     // ... Your submit logic here
    //     const concatenatedNumber = Object.values(inputValues).join('');
    //     const resultNumber = parseInt(concatenatedNumber, 10);
    //     if (!PIN) {
    //         window.localStorage.setItem("PIN", String(resultNumber))
    //         styledToast("PIN Setup Successfull", 'success')   
    //         SettingsStore.setAuth(true)
    //         router.push('/')
    //     } else {
    //         if (PIN === String(resultNumber)) {
    //             SettingsStore.setAuth(true)
    //             router.push('/')
    //         } else {
    //             console.log("incorrect PIN")
    //             styledToast("Incorrect PIN", 'error')
    //         }
    //     }
    //     console.log("Concatenated Number:", resultNumber);
    // };

    const validateNumbersOnly = (value: string) => {
        const regex = /^[0-9]+$/;
        return regex.test(value);
      };


    const handleSubmit = (e: any) => {
        console.log(e.target.value,"1111")
        if (e.target.value.length === 6) {
            // const concatenatedNumber = Object.values(inputValues).join('');
            // const resultNumber = parseInt(concatenatedNumber, 10);
            if (!PIN) {
                window.localStorage.setItem("PIN", String(e.target.value))
                styledToast("PIN Setup Successfull", 'success')
                SettingsStore.setAuth(true)
                router.push('/')
            } else {
                if (PIN === String(e.target.value)) {
                    SettingsStore.setAuth(true)
                    router.push('/')
                } else {
                    console.log("incorrect PIN")
                    styledToast("Incorrect PIN", 'error')
                }
            }
        }
        setPinValue(e.target.value)
    }

    console.log({pinValue})

    // console.log({ pinValue, length: pinValue.length })
    //return child component
    return (
        <>
            {/* <div id='OTPInputGroup' className={"digitGroup"} data-autosubmit="true">
            <OTPInput
                    id="input1"
                    value={inputValues.input1}
                    onValueChange={handleInputChange}
                    previousId={null}
                    handleSubmit={handleSubmit}
                    nextId="input2"
                />
                <OTPInput
                    id="input2"
                    value={inputValues.input2}
                    onValueChange={handleInputChange}
                    previousId="input1"
                    handleSubmit={handleSubmit}
                    nextId="input3"
                />
                <OTPInput
                    id="input3"
                    value={inputValues.input3}
                    onValueChange={handleInputChange}
                    previousId="input2"
                    handleSubmit={handleSubmit}
                    nextId="input4"
                /> */}
                {/* Seperator */}
            {/* <span className={"splitter"}>&ndash;</span> */}
            {/* <OTPInput
                    id="input4"
                    value={inputValues.input4}
                    onValueChange={handleInputChange}
                    previousId="input3"
                    handleSubmit={handleSubmit}
                    nextId="input5"
                />
                <OTPInput
                    id="input5"
                    value={inputValues.input5}
                    onValueChange={handleInputChange}
                    previousId="input4"
                    handleSubmit={handleSubmit}
                    nextId="input6"
                />
                <OTPInput
                    id="input6"
                    value={inputValues.input6}
                    onValueChange={handleInputChange}
                    previousId="input5"
                    handleSubmit={handleSubmit}
                />  */}

            {/* <Input.Password size="xl" css={{
                background: "grey",
                fontSize: "xxx-large",
                textAlign: "center"
            }} /> */}
            <Input
                // label="Enter PIN"
                // hideToggle
                {...bindings}
                type="password"
                size="xl"
                style={{
                    width: '100%',
                    background: "grey",
                    fontSize: "xxx-large !important",
                    color: COLOR.yellow,
                    textAlign: "center",
                    borderRadius: "0.4rem"
                }}
                helperColor={validateNumbersOnly(pinValue) ? "success" : "error"}
                helperText={validateNumbersOnly(pinValue) ? "" : "Only use digits"}
                value={pinValue}
                onChange={handleSubmit}
                maxLength={6}
            // data-testid="uri-input"
            >
            </Input>
            <Spacer y={1.5} />
            {/* </div> */}
            {!PIN ?
                <Fragment>
                    <Text color="error" css={{textAlign:"center"}}>
                        Remember! We cant recover your PIN
                    </Text>
                    <Button
                        disabled={pinValue.length<6 || !validateNumbersOnly(pinValue)}
                        color='warning'
                        css={{
                            width: "100%",
                        }}
                        onClick={handleSubmit}>
                        Create PIN
                    </Button>
                </Fragment>
                :
                <Button 
                disabled={pinValue.length<6 || !validateNumbersOnly(pinValue)} 
                color='warning' 
                css={{ width: "100%" }} 
                onClick={handleSubmit}>
                    Verify PIN
                </Button>
            }
        </>
    );
}

//Our child component
const OTPInput = ({ id, previousId, nextId, value, onValueChange, handleSubmit }: any) => {
    //This callback function only runs when a key is released
    const handleKeyUp = (e: any) => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;
        //check if key is backspace or arrowleft
        if (e.keyCode === 8 || e.keyCode === 37) {
            //find the previous element
            const prev = document.getElementById(previousId);
            if (prev) {
                //select the previous element
                prev.focus();
            }
        } else if (
            (e.keyCode >= 48 && e.keyCode <= 57) || //check if key is numeric keys 0 to 9
            (e.keyCode >= 65 && e.keyCode <= 90) || //check if key is alphabetical keys A to Z
            (e.keyCode >= 96 && e.keyCode <= 105) || //check if key is numeric keypad keys 0 to 9
            e.keyCode === 39 ||//check if key is right arrow key
            (isTouchDevice && (e.type === 'touchend' || e.type === 'touchstart'))
        ) {
            //find the next element
            const next = document.getElementById(nextId);
            if (next) {
                //select the next element
                const inputElement = next as HTMLInputElement;
                inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
                inputElement.focus();
            } else {
                //check if inputGroup has autoSubmit enabled
                const inputGroup = document.getElementById('OTPInputGroup');
                if (inputGroup && inputGroup.dataset['autosubmit']) {
                    //submit the form
                    handleSubmit();
                }
            }
        }
    }
    return (
        <input
            id={id}
            name={id}
            type="text"
            className={"DigitInput"}
            value={value}
            maxLength={1}
            onChange={(e) => onValueChange(id, e.target.value)}
            onKeyUp={handleKeyUp}
        />
    );
};

export default OTPInputGroup;