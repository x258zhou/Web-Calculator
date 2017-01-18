/*
This JavaScript code realize main functions of the calculator.
Temp1 records the input string.
Temp2 judges whether the number need to be keeped on the screen. The result of the equation will be keep if sympols are used after it.
The num and the sym functions records the key with parameters. Temp1 records the input chars.
The left bracket is different because it must appears on the left of the result, so I use a seperate function bracket_left.
Basicly the result was given by the eval() function. A try-catch structure was used to identify invaild inputs, empty inputs and divide-by-zero situation.
*/


var temp1 = "";
var temp2 = false;
var errtxt1 = "Empty equation :)";
var errtxt2 = "Oops! There there might be some errors in your equation. Keep this equation? :)";
var errtxt3 = "Cannot divide by 0. Keep this equation? :)";

function default_set()
{
	var result = document.getElementById("result");
	result.innerHTML = "";
	temp1 = "";
	temp2 = false;
}

function num(num)
{
	var result = document.getElementById("result");
	if(temp2)
	{
		default_set();
		temp2 = false;
	}
	result.innerHTML += num;
	temp1 += num;
}

function sym(sym)
{
	var result = document.getElementById("result");
	if(temp2)
	{
		result.innerHTML = temp1;
		temp2 = false;
	}
	result.innerHTML += sym;
	temp1 += sym;

}

function bracket_left()
{
	var result = document.getElementById("result");
	if(temp2)
	{
		result.innerHTML = "(" + temp1;
		temp1 = result.innerHTML;
		temp2 = false;
	}
	else
	{
		result.innerHTML += "(";
		temp1 += "(";
	}
}

function clean()
{
	var result = document.getElementById("result");
	result.innerHTML = "";
}

function equals()
{
	try
	{
		var result = document.getElementById("result").innerHTML;
		if(temp1 == "")
		{
			document.getElementById("result").innerHTML = "";
			throw "Empty";
		}
		else if((eval(temp1) == "Infinity") || (eval(temp1) == "-Infinity") || (eval(temp1) == "NaN"))
		{
			throw "divide_zero";
		}
		else
		{
			document.getElementById("result").innerHTML = eval(temp1);
		}
		temp1 = eval(temp1).toString();
		temp2 = true;
	}
	catch(err)
	{
		var result = document.getElementById("result");
		if(err == "Empty")
		{
			alert(errtxt1);
			result.innerHTML = temp1;
		}
		else if(err == "divide_zero")
		{
			if(!confirm(errtxt3))
			{
				default_set();
				temp2 = false;
			}
		}
		else
		{
			if(!confirm(errtxt2))
			{
				default_set();
				temp2 = false;
			}
		}
	}
}

function deletenum()
{
	var result = document.getElementById("result").innerHTML;
	document.getElementById("result").innerHTML = document.getElementById("result").innerHTML.substring(0,document.getElementById("result").innerHTML.length-1);
	temp1 = temp1.substring(0,temp1.length-1);
}