import React, { Component, useState } from 'react'
import Button from './Button'
import ButtonBox from './ButtonBox'
import Wrapper from './Wrapper'
import Screen from './Screen'


const btnValues = [
    ["C" , "+/-", "%", "/"],
    [7,8,9,"x"],
    [4,5,6, "-"],
    [1,2,3, "+"],
    [0, ".", "="],
  ]

  // Handler for number "string" so it looks nice in the app, gotten from https://stackoverflow.com/questions/3753483/javascript-thousand-separator-string-format/25325690#25325690 by user Emissar
const toLocalString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
const removeSpaces = (num) => num.toString().replace(/\s/g, "")

// initialize the App with sign, result, and number entered
const Calculator = () => {
    let [calc,setCalc] = useState ({
        sign: "",
        num: 0,
        res: 0,
    })
    //handler for the number selected, allows numbers up to 16 digits and doesn't allow multiple zeroes
    const numSelectHandler = (e) => {
        e.preventDefault()
        const value = e.target.innerHTML
        //if/then chain that determines all calculations in the calculator
        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value ==='0'
                    ? '0'
                    : removeSpaces(calc.num) % 1 === 0
                    ? toLocalString(Number(removeSpaces(calc.num + value)))
                    : toLocalString(calc.num+value),
                res: !calc.sign ? 0 : calc.res,
            })
        }
    }
    //handler for decimal points, 
    const commaSelectHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        })
    }
    //handler for - sign, allows negative numbers and such
    const signSelectHandler =(e) => {
        e.preventDefault()
        const value = e.target.innerHTML

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        })
    }
    // handler for the equals sign, good for addition subtraction, and multiplication
    const equalsSelectHandler = () => {
        if (calc.sign && calc.num) {
            const math = (a, b, sign) =>
            sign === "+"
            ? a + b
            : sign === "-"
            ? a - b
            : sign === "x"
            ? a * b
            : a / b
            // the above is a style of if/then logic in js using ?/: (easier to type)
        setCalc({
            ...calc,
            //check if dividing by zero, before division goes through
            res:
                calc.num === "0" && calc.sign === "/"
                ? "Can't divide with zero"
                : toLocalString(
                    math(
                        Number(removeSpaces(calc.res)),
                        Number(removeSpaces(calc.num)),
                        calc.sign
                    )
                ),
            sign: "",
            num: 0,
        })
        }
    }
    //Handler for the "invert" button, when pressed it flips a value from positive to negative
    const invertSelectHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? parseFloat(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? parseFloat(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        })
    }
    //Handler for the "percent" operation, uses a parseFloat function and removes spaces to convert to a percentage
    const percentSelectHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0
        //iterate through and set num and res to a percentage
        setCalc({
            ...calc,
            num: (num /= Math.pow(100,1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        })
    }
    //next handler is for a reset, the clear button. Sets everything back to start
    const resetSelectHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        })
    }

class Calculator extends Component {


//render the screen, this makes the calculator itself, also set buttons and what they call function-wise
render(){
    return (
       <Wrapper>
        <Screen value= {calc.num ? calc.num : calc.res} />
          <ButtonBox>
            {btnValues.flat().map((btn, i) => {
                return (
                    <Button
                        key = {i}
                        className = {btn === "=" ? "equals" : ""}
                        value={btn}
                        onClick={
                            btn ==="C"
                                ? resetSelectHandler
                                : btn === "+/-"
                                ? invertSelectHandler
                                : btn === "%"
                                ? percentSelectHandler
                                :btn === "/" || btn === "x" || btn === "+" || btn === "-"
                                ?signSelectHandler
                                :btn === "."
                                ? commaSelectHandler
                                :numSelectHandler
                            } 
                            />
                )
            })}
          </ButtonBox>
       </Wrapper>
    )
}
}
}
export default Calculator