function eval() {
    // Do not use eval!!!
    return;
}
function postfix(expr) {
    expr = expr.replace(/\s/g, '');
    let char = [];
    let out = '';
    let priority = {
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2,
      '(': 1
    }
  
    for (let i = 0; i < expr.length; i++) {
      if (!isNaN(expr[i]) ) {
        out += (expr[i] + (!isNaN(expr[i+1]) ? '' : ' '));
        continue;
      } 
      if (expr[i] == '(') {
        char.push('(');
        continue;
      }
      if (expr[i] == ')') {
        while (char.slice(-1) != '(') {
          out += (char.pop() + ' ');
        }
        char.pop();
        continue; 
      }
      if ('+-*/'.includes(expr[i])) {
        while (priority[char.slice(-1)] >= priority[expr[i]]) {
          out += (char.pop() + ' ');
        }
        char.push(expr[i]);
      }
    }
    while (char.length > 0) {
      out += (char.pop() + ' ');
    }
    return out.slice(0, -1);
};
  
function expressionCalculator(expr) {
    if ([...expr.matchAll(/\(/g)].length != [...expr.matchAll(/\)/g)].length) {
        throw new Error("ExpressionError: Brackets must be paired")
    }
    let stack = [];
    for (op of postfix(expr).split(' ')) {
      if (!isNaN(op)) {
        stack.push(op);
        continue;
      };
      if (op == '+') {
        stack.push(Number(stack.pop()) + Number(stack.pop()));
        continue;
      }
      if (op == '-') {
        stack.push(-Number(stack.pop()) + Number(stack.pop()));
        continue;
      }
      if (op == '*') {
        stack.push(Number(stack.pop()) * Number(stack.pop()));
        continue;
      }
      if (op == '/') {
        if (stack.slice(-1) == '0') {throw new Error('TypeError: Division by zero.')}
        stack.push(1 / (Number(stack.pop()) / Number(stack.pop())));
        continue;
      }
    }
     return stack.pop();
}

module.exports = {
    expressionCalculator
}