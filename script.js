let smallVar = ''
let bigVar = ''
let arrayStorage = []
let calculationResult

const elementArray = document.querySelectorAll(".digit")
const operatorArray = document.querySelectorAll(".operator")
const negativePositive = document.querySelector(".neg-pos")
const result = document.getElementById("equal")
const operations = document.getElementById("operations")



elementArray.forEach(elem => {
    elem.addEventListener('click', () => {
        smallVar = elem.textContent
        bigVar += smallVar
        operations.textContent += elem.textContent
    })
})

operatorArray.forEach(elem => {
    elem.addEventListener('click', () => {
        arrayStorage.push(bigVar)
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
    if (smallVar == '') alert("error")
    arrayStorage.push(bigVar)

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

}