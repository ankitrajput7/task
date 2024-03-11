function sendResponce(code, message,type="false", data=[] ) {
  return {
    code: code,
    message: message,
    type:type,
    data:data
  };
}


export default sendResponce;