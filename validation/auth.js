const validateEmail = (email)=>{
    if(email.includes("@") && email.includes(".com")){
        return email;
    }
    return "";
}
const validatePassword = (password)=>{
    if(password.length>=6){
        return password;
    }
    return "";
}
const validateName = (name)=>{
    const temp = name.replace(/\s/g, '');
    if(temp.length>=3 && temp!=''){
        return name;
    }
    return "";
}
module.exports = {validateEmail,validatePassword,validateName}