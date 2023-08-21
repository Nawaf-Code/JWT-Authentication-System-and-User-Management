import { useEffect } from 'react';
import './PasswordStrength.css';
function PasswordStrength(props){
    const strengthChecker = () => {      
      	let strengthValue = 0;
      	let regexList = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];
      	let strengthText = ["", "unacceptable", "weak", "average", "good", "strong"];
	
      	regexList.forEach((regex) => {
        	if (new RegExp(regex).test(props.password)) {
          		strengthValue += 1;
        	}
      	});
      	if(props.password.length >=8){
        	strengthValue += 1;
      	}
      	return { text: strengthText[strengthValue], value: strengthValue }
    };
	const handlesStrengthText = () => {
		props.text(strengthChecker().text);
	}
	useEffect(() =>{
		handlesStrengthText();
	},[strengthChecker().text]);
    return <div > 
        <progress
            className={`pwd-checker-bar strength-${strengthChecker().text}`}
            value={strengthChecker().value}
            max="5"
          /> 
		  {strengthChecker().text}
      </div>;
}
export default PasswordStrength;