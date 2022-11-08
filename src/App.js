import React, { Component, useState } from 'react'
import Button from './Button'
import ButtonBox from './ButtonBox'
import Wrapper from './Wrapper'
import Screen from './Screen'
import Calculator from './Calculator'
import { render } from 'react-dom'

class App extends Component {


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

    export default App