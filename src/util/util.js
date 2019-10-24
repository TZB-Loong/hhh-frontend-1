 const setAppBgColor = (isGray,targetElemId,className)=>{
    if(isGray){
        document.getElementById(targetElemId).classList.add(className);
      }else{
        
         document.getElementById(targetElemId).className = ''
      }
}

module.exports={
    setAppBgColor:setAppBgColor
}
