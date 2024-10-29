function sum(a, b) {
    return a + b;
  }

  function div (a, b){
    if (b === 0){
        throw new Error("Division by zero isnt allowed.")
    }
    return a / b;
  }
  
  function containsNumbers(text){
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        if (!isNaN(text.charAt(i))){
            return true;
        }
    }
    return false;
  }

  export default { sum, div, containsNumbers };