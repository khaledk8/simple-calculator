let smallVar = ''
let bigVar = ''
let arrayStorage = []
let calculationResult = ''

const elementArray = document.querySelectorAll(".digit")
const operatorArray = document.querySelectorAll(".operator.last")
const negativePositive = document.querySelector(".neg-pos")
const result = document.getElementById("equal")
const operations = document.getElementById("operations")
const backSpace= document.getElementById("delete")
const resultDiv = document.getElementById("result")
const clearButton = document.querySelector(".clear")

clearButton.addEventListener('click', () => {
    bigVar = ''
    smallVar = ''
    operations.textContent = ''
    resultDiv.textContent = ''
    let j = arrayStorage.length
    for (let i = 0; i < j; i++) {
        arrayStorage.pop()
    }
})

elementArray.forEach(elem => {
    elem.addEventListener('click', () => {
        if (checkResultDiv()) {
            bigVar = ''
    smallVar = ''
    operations.textContent = ''
    resultDiv.textContent = ''
    let j = arrayStorage.length
    for (let i = 0; i < j; i++) {
        arrayStorage.pop()
    }
        }
        smallVar = elem.textContent
        bigVar += smallVar
        if (checker()) arrayStorage.push(bigVar)
        arrayStorage[arrayStorage.length - 1] = bigVar
        operations.textContent += elem.textContent
    })
})

function checkResultDiv() {
    if (resultDiv.textContent !== '') {
        operations.textContent = resultDiv.textContent.toString()
        return true
    }
    return false
}

function checker () {
    if (arrayStorage[arrayStorage.length-1] == '' || arrayStorage[arrayStorage.length-1] == 'x' || arrayStorage[arrayStorage.length-1] == '+' || arrayStorage[arrayStorage.length-1] == '/' || arrayStorage[arrayStorage.length-1] == '−' || arrayStorage[arrayStorage.length-1] == undefined || arrayStorage[arrayStorage.length-1] == null) {
        return true
    }
    return false
}

operatorArray.forEach(elem => {
    elem.addEventListener('click', () => {
        checkResultDiv()
        resultDiv.textContent = ''
        bigVar = ""
        smallVar = ""
        arrayStorage.push(elem.textContent)
        operations.textContent += elem.textContent
    })
} )





negativePositive.addEventListener('click', () => {
    if (bigVar[0] == '-') {
        bigVar = bigVar.substring(1)
        return
    }
    bigVar = "-" + bigVar
    operations.textContent += '-'
})

result.addEventListener('click', () => {
    if (smallVar == '') {
        resultDiv.textContent = "Error"
        return
    }
    bigVar = ''
    calculate()

})

backSpace.addEventListener('click', () => {
    if (checker()) {
        arrayStorage.pop()
        operations.textContent = operations.textContent.slice(0,-1)
        return
    }
    operations.textContent = operations.textContent.slice(0,-1)
    arrayStorage[arrayStorage.length - 1] = arrayStorage[arrayStorage.length - 1].slice(0,-1)
    bigVar = bigVar.slice(0,-1)
    if (arrayStorage[arrayStorage.length - 1] == "") {
        arrayStorage.pop()
        return
    }
    console.log(arrayStorage)
})


function add (a,b) {
    return a+b
}

function subtract (a,b) {
    return a-b
}

function multiply (a,b) {
    return a*b
}

function divide (a,b) {
    return a/b
}


function calculate () {
    let filtered = arrayStorage.filter((element) => {
        if (element=='x') return true;
        if (element=='/') return true;
    })
    for (let i = 0; i <= filtered.length; i++) {
        if (arrayStorage.includes('x') || arrayStorage.includes('/')) firstOrderCalculate()
    }    
    if (arrayStorage.length < 3) {
        resultDiv.textContent =  Math.round(parseFloat(arrayStorage[0]) * 100) / 100
        return
    }    
    secondOrderCalculate()
    if (arrayStorage.length > 1) calculate()
    resultDiv.textContent = Math.round(parseFloat(arrayStorage[0]) * 100) / 100

}


function firstOrderCalculate () {
    if (arrayStorage.includes('x') && arrayStorage.includes('/')) {
        if (arrayStorage.indexOf('x') < arrayStorage.indexOf('/')) {
            arrayStorage.splice(arrayStorage.indexOf('x')-1,3,multiply(parseFloat(arrayStorage[arrayStorage.indexOf('x')-1]),parseFloat(arrayStorage[arrayStorage.indexOf('x')+1])))
        } else {
            arrayStorage.splice(arrayStorage.indexOf('/')-1,3,divide(parseFloat(arrayStorage[arrayStorage.indexOf('/')-1]),parseFloat(arrayStorage[arrayStorage.indexOf('/')+1])))
        }
        return
    }
    if (arrayStorage.includes('x')) {
        arrayStorage.splice(arrayStorage.indexOf('x')-1,3,multiply(parseFloat(arrayStorage[arrayStorage.indexOf('x')-1]),parseFloat(arrayStorage[arrayStorage.indexOf('x')+1])))
        return
    }
    arrayStorage.splice(arrayStorage.indexOf('/')-1,3,divide(parseFloat(arrayStorage[arrayStorage.indexOf('/')-1]),parseFloat(arrayStorage[arrayStorage.indexOf('/')+1])))

}

function secondOrderCalculate () {
    if (arrayStorage.includes('+') && arrayStorage.includes('−')) {
        if (arrayStorage.indexOf('+') < arrayStorage.indexOf('−')) {
            arrayStorage.splice(arrayStorage.indexOf('+')-1,3,add(parseFloat(arrayStorage[arrayStorage.indexOf('+')-1]),parseFloat(arrayStorage[arrayStorage.indexOf('+')+1])))
        } else {
            arrayStorage.splice(arrayStorage.indexOf('−')-1,3,subtract(parseFloat(arrayStorage[arrayStorage.indexOf('−')-1]),parseFloat(arrayStorage[arrayStorage.indexOf('−')+1])))
        }
        return
    }
    if (arrayStorage.includes('+')) {
        arrayStorage.splice(arrayStorage.indexOf('+')-1,3,add(parseFloat(arrayStorage[arrayStorage.indexOf('+')-1]),parseFloat(arrayStorage[arrayStorage.indexOf('+')+1])))
        return
    }
    console.log(arrayStorage)
    arrayStorage.splice(arrayStorage.indexOf('−')-1,3,subtract(parseFloat(arrayStorage[arrayStorage.indexOf('−')-1]),parseFloat(arrayStorage[arrayStorage.indexOf('−')+1])))
    console.log(arrayStorage)
}