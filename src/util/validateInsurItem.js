const ValidateItemFunc = {

    //校验身份证
      insurantCertNum:function (val) {
          let that=this;
          let birth = "";
          val = (val.replace(/\s/g, '')).toUpperCase();  //去掉空格
          let city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
          };
          birth = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2);
          let d = new Date(birth);
          let month = d.getMonth() + 1;
          let date = d.getDate();
          if (month < 10) {
            month = 0 + "" + month
          }
          if (date < 10) {
            date = 0 + "" + date;
          }
          let newBirthday = d.getFullYear() + '-' + month + '-' + date;
          let currentTime = new Date().getTime();
          let time = d.getTime();
          let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
          let sum = 0, i, residue;
          //证件号码校验
          if (!/^\d{17}(\d|x)$/i.test(val)) {
            return false;
          }
          //地区校验
          if (city[val.substr(0, 2)] === undefined) {
            return false;
          }
          //出生日期校验
          if (time >= currentTime || birth !== newBirthday) {
            return false;
          }
          //校验码
          for (i = 0; i < 17; i++) {
            sum += val.substr(i, 1) * arrInt[i];
          }
          residue = arrCh[sum % 11];
          if (residue !== val.substr(17, 1)) {
            return false;
          }
         return true;
      },
  
    //身份证有效期校验
    certNumExpiryDate(birthdayStr,expiryDate){
      //birthDate-出生日期 certNum - 身份证证件有效期
      if((!birthdayStr) || (!expiryDate)){
         return true;
       }
      let nowDate = new Date();
      let nowYear = nowDate.getFullYear();
      let nowMonth = nowDate.getMonth() + parseInt(1);
      let nowDay = nowDate.getDate();
  
      var age = this.getInsurAgeNowByBirth(birthdayStr);
  
      if(expiryDate == "长期" || expiryDate == "9999-12-31"){
          if(age < 46){
            return false; 
          }
      }else{
          var dateArray = expiryDate.split('-');
          let expiryYear = dateArray[0];
          let expiryMonth = parseInt(dateArray[1]);
          let expiryDay = parseInt(dateArray[2]);
  
          var y2 = expiryYear - nowYear, m2 = expiryMonth - nowMonth, d2 = expiryDay - nowDay;
          let gapTime =   parseInt(y2) + parseInt( ((m2 < 0) || ((m2 == 0) && (d2 < 0)) ? 0 : 1) ); //与投保日时间差
        
  
        let currentTime = new Date(nowYear + "/"+ nowMonth + "/" +nowDay).getTime();
        let expiryTime = new Date(expiryDate.replace(/-/g,"/")).getTime();
  
        /*if(y2 == 0 && m2 == 0 && d2 <= 0){
           //截止日不能小于当日
          return false;
        }
  */
  
        if(currentTime > expiryTime){
           //截止日不能小于当日
          return false;
        }
        if(age < 16){
          if(parseInt(gapTime) > 5){
             return false; 
          }
        }else if(age >= 16 && age <= 25){
              if(parseInt(gapTime) > 10){
               return false;
              }
          }else if(age > 25 && age <= 45){
             if(parseInt(gapTime) > 20){
               return false; 
            }
          }else if(age >= 46){
            //非长期
            if(parseInt(gapTime) > 20){
               return false; 
            }
          }
      }
      
     return true;
    },
  
    //是否可用出生证录入信息
     fitBirthTypeAge(birthdayStr){
        if(2 < this.getInsurAgeNowByBirth(birthdayStr)){
            return false;
        }
        return true;
     },
  
      //是否可用户口本录入信息(4周岁（含）以下)
     fitResidenBookAge(birthdayStr, startInsurDateStr){
        if(16 < this.getInsurAgeNowByBirth(birthdayStr)){
          return false;
        }
        return true;
     },
  
     //通过出生日期计算年龄
    getInsurAgeNowByBirth(birthdayStr, startInsurDateStr){
       //startInsurDateStr -- 起保开始日期
      var dateArray = birthdayStr.split('-');
      let birthYear = dateArray[0];
      let birthMonth = parseInt(dateArray[1]);
      let birthDay = parseInt(dateArray[2]);
  
      let nowDate = new Date();
      if(startInsurDateStr){
         nowDate = new Date(startInsurDateStr.replace(/-/g,"/"));
      }
      let nowYear = nowDate.getFullYear();
      let nowMonth = nowDate.getMonth() + parseInt(1);
      let nowDay = nowDate.getDate();
      
      var y = nowYear - birthYear, m = nowMonth - birthMonth, d = nowDay - birthDay;
      var insurAge =  y - ((m < 0) || ((m == 0) && (d < 0)) ? 1 : 0);
      return insurAge;
    },
  
     //判断省、市、区及详细地址是否至少有12个中文
    fitAddressLen(pca,addr){
        if((!pca) || (!addr)){
          return true;
        }
        var fullAddress = pca + addr;
       let re = /[\u4E00-\u9FA5]/g;
        if (re.test(fullAddress)){  
          if (fullAddress.match(re).length < 12) {  //返回中文的个数   
              return false;  
          }else{
              return true;
          }
        }else{
          return false;
        }  
    },
     //校验父子（女）和母子（女）年龄差
      fitRelationAge(applicantBirthDay, insurantBirthDay){
        if((!applicantBirthDay) || (!insurantBirthDay)){
         return true;
        }
        var applicantAge = this.getInsurAgeNowByBirth(applicantBirthDay),
            insurAge = this.getInsurAgeNowByBirth(insurantBirthDay);
        if(Math.abs(applicantAge - insurAge) < 18){
            return false;
        }
        return true;
      },
  
      //证件号每4位之间用空格隔开-格式化证件号码(111111  1990  0110  1111)
        formatCertNumBySpace(val){
          if(val && /\S{6}/.test(val)){
           var operateVal = val.replace(/\s/g, '');
             var preVal = operateVal.substr(0,6),
                 afterVal = operateVal.substr(6,val.length);
              var temp =  afterVal.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
              if(temp){
                //去除首尾空格
                val = (preVal + ' ' + temp).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
              }else{
                val = preVal;
              }
          }
          return val;
        },
  
         //手机号格式化(111  1111  1111)
        formatPhoneBySpace(val){
          if(val && /\S{3}/.test(val)){
           var operateVal = val.replace(/\s/g, '');
             var preVal = operateVal.substr(0,3),
                 afterVal = operateVal.substr(3,val.length);
              var temp =  afterVal.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
              if(temp){
                //去除首尾空格
                val = (preVal + ' ' + temp).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
              }else{
                val = preVal;
              }
          }
          return val;
        },
  
          //姓名校验
        nameAvolid(val){
          let name=val;
          //let re=/(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\·]{0,}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{1,18}[a-zA-Z]{1}$)/;
          let re = /(^[\u2E80-\uFE4F]{2,10}$)|(^[a-zA-Z]{2,32}$)/;
          let tips="";
          if(val&&!re.test(name)){
           /* tips = "姓名格式有误！";
            return tips;*/
            return false;
          } else {
            for (var i = 0 ; i < name.length;i++){
              if((name[i]=="·" && name[i+1]=="·") || (name[i]==" " && name[i+1]==" ")){
                /*tips = "姓名格式有误！";
                return tips;*/
                return false;
              }
            }
          }
         /* if(tips){
            return tips;
          }*/
          return true;
        },
  
       //邮箱校验
        emailAvolid:function (val) {
          //let tips="邮箱地址不能为空";
          let re=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(val&&!re.test(val)){
            //return "请输入正确的邮箱地址！";
            return false;
          }
          return true;
        },
        //邮编校验
        zipCodeAvolid:function (val) {
          let re=/^[1-9][0-9]{5}$/;
          if(!val || !re.test(val)){
            //return "请输入正确的邮箱地址！";
            return false;
          }
          return true;
        },
        //详细地址校验
        addressAvolid:function (val) {
          let address=val;
          //let tips="地址不能为空";
          let re=/([^\x00-\xff]|[A-Za-z0-9_])$/;
          if(val&&!re.test(address)){
            //return '地址格式不正确';
            return false;
          }
          return true;
        },
  
        // 验证手机号码
        //mobileNo(val, roleName){
        mobileNo(val){
          //let tips= roleName +"手机号码不能为空";
          //var pattern = /^1[3|4|5|7|8][0-9]\d{8}$/;
          //var pattern = /^1[0-9]\d{9}$/;
          var pattern = /^1[3|4|5|7|8|6|9][0-9]\d{8}$/;
          if(val){
            val = val.replace(/\s/g, '');
            if(!pattern.test(val)){
                //return roleName+"手机号码录入有误";
                return false;
            }
            var repeatNum = 0,repeatVal = val.charAt(3);
            for(var i = 4; i < val.length; i++){
               if(repeatVal != val.charAt(i)){
                 return true;
               }
            }
            if(i == val.length){
              //return roleName+"手机号码录入有误";
              return false;
            }
            return true;
          }
          return true;
        },
  
        //根据类型校验身份证
        //autoFillInput (val,type) {
        validateIdentityByType(val, type){
          //type -- 证件类型  01是身份证，02是护照，03是军官证，军人证，04户口本，05出生证, 08通行证
          let that=this;
          if(!val){
            return true;
          }
         if(type=="01" || type=="04") { 
          let birth = "";
          val = (val.replace(/\s/g, '')).toUpperCase();
            let city = {
              11: "北京",
              12: "天津",
              13: "河北",
              14: "山西",
              15: "内蒙古",
              21: "辽宁",
              22: "吉林",
              23: "黑龙江 ",
              31: "上海",
              32: "江苏",
              33: "浙江",
              34: "安徽",
              35: "福建",
              36: "江西",
              37: "山东",
              41: "河南",
              42: "湖北 ",
              43: "湖南",
              44: "广东",
              45: "广西",
              46: "海南",
              50: "重庆",
              51: "四川",
              52: "贵州",
              53: "云南",
              54: "西藏 ",
              61: "陕西",
              62: "甘肃",
              63: "青海",
              64: "宁夏",
              65: "新疆",
              71: "台湾",
              81: "香港",
              82: "澳门",
              91: "国外"
            };
            birth = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2);
            let d = new Date(birth);
            let month = d.getMonth() + 1;
            let date = d.getDate();
            if (month < 10) {
              month = 0 + "" + month
            }
            if (date < 10) {
              date = 0 + "" + date;
            }
            let newBirthday = d.getFullYear() + '-' + month + '-' + date;
            let currentTime = new Date().getTime();
            let time = d.getTime();
            let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            let sum = 0, i, residue;
            //证件号码校验
            if (!/^\d{17}(\d|x)$/i.test(val)) {
              //return roleName+"证件号码有误！";
              return false;
            }
            //地区校验
            if (city[val.substr(0, 2)] === undefined) {
              //return roleName+"证件号码有误！";
              return false;
            }
            //出生日期校验
            if (time >= currentTime || birth !== newBirthday) {
              /* that.showtip = true;
               that.text = "出生日期有误！";*/
              //return roleName+"出生日期有误！";
              return false;
            }
            //校验码
            for (i = 0; i < 17; i++) {
              sum += val.substr(i, 1) * arrInt[i];
            }
            residue = arrCh[sum % 11];
            if (residue !== val.substr(17, 1)) {
              //return roleName+"证件号码有误";
               return false;
            }
             //调用自动填充性别和出生日期方法
            //that.getSexAndBirth(val,"aplit",birth)
            return true;
          }else if(type == "05"){
            val = (val.replace(/\s/g, '')); //去掉空格
            let re=/[A-Z]{1}\d{9}$/;   // 校验出生证
            if(!re.test(val)){
              //return roleName+"证件号码有误！";
              return false;
            }
            return true;
          }else if(type == "08"){
            val = (val.replace(/\s/g, '')); //去掉空格
            let re=/[A-Z0-9]{8}$/;   // 校验通行证
            if(!re.test(val)){
              //return roleName+"证件号码有误！";
              return false;
            }
            return true;
          }      
       },
  
        //投保人/被保人年龄限制
          isFitAgeGroup:function (idCardNum,minAge,maxAge,startInsurDateStr) {
  
          //idCardNum 身份证号码  startInsurDateStr--开始起保日期 
            let that=this, errorMessage = '';
            if(idCardNum){
              idCardNum = idCardNum.replace(/\s/g, '');
              let str= idCardNum.substring(6,10), nowYear = 0;
  
              if(startInsurDateStr){
                 nowYear = new Date(startInsurDateStr.replace(/-/g,"/")).getFullYear();
              }else{
                 nowYear = new Date(new Date().getTime()+1000*60*60*24).getFullYear();
              }
              let year = parseInt(nowYear) - parseInt(str);
              if(year < minAge ){
                errorMessage = "年龄不能小于"+minAge+"岁！";
                //return false;
              }else if(year > maxAge ){
                 errorMessage = "年龄不能大于"+(maxAge-1)+"岁！";
                //return false;
              }else if(year == minAge){
                if(minAge == 0){
                  let birthday = idCardNum.substr(6, 4) + '-' + idCardNum.substr(10, 2) + '-' + idCardNum.substr(12, 2);
                  if(!that.isBabyAllowedInsur(birthday, startInsurDateStr)){
                    errorMessage = "年龄不能小于30天！";
                  }
                }else{
                  //低于最小值
                  if(that.isOverMinAge(idCardNum, startInsurDateStr)){
                    errorMessage = "年龄不能小于"+minAge+"岁！";
                  }
                }
                
                //return !that.isOverMinAge(age);
              }else if(year == maxAge){
  
                //超过最小值未满最大值
                 if(that.isOverMaxAge(idCardNum, startInsurDateStr)){
                  errorMessage = "年龄不能大于"+(maxAge-1)+"岁！";
                }
                //return !that.isOverMaxAge(age);
              }
              return errorMessage;
            }
            return errorMessage; 
       },
  
  
        //判断年龄是否超过边界值
        isOverMaxAge(idCardNum, startInsurDateStr){
          var that = this;
          let nowDate = new Date(new Date().getTime()+1000*60*60*24);
  
          if(startInsurDateStr){
             nowDate = new Date(startInsurDateStr.replace(/-/g,"/"));
          }
          let nowMonth = nowDate.getMonth() + parseInt(1);
          let birthMonth = parseInt(idCardNum.substring(10,12));
          if( nowMonth > birthMonth){
              /*that.text= role+"的年龄不在投保范围内！";
              that.showtip=true;*/
              return true;
          }else if(nowMonth == birthMonth){
            let nowDay = nowDate.getDate();
            let birthDay = parseInt(idCardNum.substring(12,14));
             if( nowDay > birthDay){
              /* that.text= role+"的年龄不在投保范围内！";
               that.showtip=true;*/
               return true;
             }
          }
         return false;
        },
  
       isOverMinAge(idCardNum, startInsurDateStr){
          var that = this;
          let nowDate = new Date(new Date().getTime()+1000*60*60*24);
          if(startInsurDateStr){
             nowDate = new Date(startInsurDateStr.replace(/-/g,"/"));
          }
          let nowMonth = nowDate.getMonth() + parseInt(1);
          let birthMonth = parseInt(idCardNum.substring(10,12));
          if( nowMonth < birthMonth){
              /*that.text=role + "的年龄不在投保范围内！";
              that.showtip=true;*/
              return true;
          }else if(nowMonth == birthMonth){
            let nowDay = nowDate.getDate();
            let birthDay = parseInt(idCardNum.substring(12,14));
             if( nowDay <= birthDay){
              /* that.text=role + "的年龄不在投保范围内！";
               that.showtip=true;*/
               return true;
             }
          }
         return false;
        },
      
      //判断是否大于30天
       isBabyAllowedInsur(birthday, startInsurDateStr){
        //startInsurDateStr 表示起保日期
         var that = this, birthday = birthday.replace(/-/g,"/");
         if(startInsurDateStr){
           startInsurDateStr = startInsurDateStr.replace(/-/g,"/");
         }
          let day1 = new Date(birthday).getTime(), day2 = null;
              
          if(startInsurDateStr){
             day2 = new Date(startInsurDateStr).getTime();
          }else{
             let currDate = new Date(new Date().getTime()+1000*60*60*24);
             let currStr = currDate.getFullYear() + '/' + (currDate.getMonth() + 1) + '/' + (currDate.getDate());
             day2 = new Date(currStr).getTime();
          }
          let day = (day2 - day1) / (1000 * 60 * 60 * 24);
          if(day < 30){
            return false;
          }
          return true;
        },
        //被保人年龄限制（根据生日）
         validateInsurantAge(birthday, insurMinAge, insurMaxAge, startInsurDateStr){
          var that = this, insurAge = 0;
          if(startInsurDateStr){
             insurAge = that.getInsurAgeNowByBirth(birthday,startInsurDateStr);
          }else{
             insurAge = that.getInsurAgeNowByBirth(birthday);
          }
          if(birthday){
            if(insurAge < insurMinAge || insurAge > (insurMaxAge -1)){
              return false;
            }
            if(insurMinAge == 0){
               return that.isBabyAllowedInsur(birthday,startInsurDateStr);
            }
            //return false;
           }   
           return true;
        },
        
       // --- 获取date y年后的d天（负值为前d天）
       clacDate: function (date, y, d) {
        let dt = new Date(date)
        dt.setFullYear(dt.getFullYear() + y)
        dt.setDate(dt.getDate() + d)
        let year = dt.getFullYear()
        let month = dt.getMonth() + 1
        let day = dt.getDate()   
        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + day
        return year + '-' + month + '-' + day
      },
  
      //用户密码设置
      checkUserPasswd(passwd){
        if(!/^[a-zA-Z0-9]{6,16}$/.test(passwd)){
            return false;
          }
          return true;
      }
  }
  
  export default ValidateItemFunc;