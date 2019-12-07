import {sum, square, variable, MyClass} from './import';
// import { Util, $, getTmpl,postFile,getJSONP,getRequest,postRequest,Storage,BindEvent,template} from '../common/base';

// 25
console.log(square(5));

var cred = {
    name: 'Ritesh Kumar',
    enrollmentNo: 11115078
}

var x = new MyClass(cred);

//Ritesh Kumar1
console.log(x.getName());
console.log($('body').html());
alert($('body').html());
