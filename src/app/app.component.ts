import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'simple-Calc';
  equation: string = ''; // input equation
  solution: string = ''; // output solution
  args = []; // the numbers in array
  obj = {}; // output as object

  operations(a, b, op){
    if(op == '+') return a + b;
    if(op == '-') return a - b;
    if(op == '*') return a * b;
    if(op == '#') return a / b;
  }

  // precendence of operators
  priority(op){
    if(op == '+' || op == '-') return 1
    if(op == '*' || op == '#') return 2
    return 0
  }

  // main function
  evaluate(exps){
    let i = 0,  nums = [], ops = [];

    while(i<exps.length){
      
      // if(exps[i] == ' '){
      //   i += 1;
      //   continue;
      // } 
      
      if(exps[i] == '('){
        ops.push(exps[i]);
      }
      
      else if(exps[i].charCodeAt(0) >= 48 && exps[i].charCodeAt(0) <= 57){
        let val = 0;
        while(i < exps.length && exps[i].charCodeAt(0) >= 48 && exps[i].charCodeAt(0) <= 57){
          val = (val * 10) + parseInt(exps[i]);
          i = i + 1;
        }
        nums.push(val);
        i = i - 1;
      }

      else if(exps[i] == ')'){
        while(ops.length !=0 && ops[ops.length - 1] != '('){
          let b = nums.pop()
          let a = nums.pop()
          let op = ops.pop()

          nums.push(this.operations(a, b, op));
        }
        ops.pop();
      }

      else{
        while(ops.length != 0 && this.priority(ops[ops.length - 1]) >= this.priority(exps[i])){
          let b = nums.pop()
          let a = nums.pop()
          let op = ops.pop()
           
          nums.push(this.operations(a, b, op));
        }
        ops.push(exps[i]);
      }
      i = i + 1;
    }
    while(ops.length !=0){
      let b = nums.pop()
      let a = nums.pop()
      let op = ops.pop()
               
      nums.push(this.operations(a, b, op))
    }
    return nums[nums.length - 1];
  }

  calculate(){
    let eq = this.equation.replace(/\s/g, "");
    //let eq = this.equation;
    for(let i=0;i<eq.length;i++){ 
      if(eq.charCodeAt(i)>= 48 && eq.charCodeAt(i)<= 57){
        let val = 0;
        while(i < eq.length && eq[i].charCodeAt(0) >= 48 && eq[i].charCodeAt(0) <= 57){
          val = (val * 10) + parseInt(eq[i]);
          i = i + 1;
        }
        this.args.push(val);
        i = i - 1;
      }
  }

  this.obj['inputExpression'] = this.equation;
  this.obj['inputArguments'] = this.args;
  this.obj['outputResult'] = this.evaluate(eq);

  this.solution = JSON.stringify(this.obj);
}
}

