var data = [{
        uid: '1004',
        name: 'tom',
        family: {
            father: {
                uid: '10001',
                name: 'David'
            },
            mother: {
                uid: '10002',
                name: 'Mary'
            }
        }
    }, {
        uid: '1002',
        name: 'jack',
        family: {
            father: {
                uid: '20001',
                name: 'Steven'
            },
            mother: {
                uid: '20002',
                name: 'Celia'
            }
        }
    },
    {
        uid: '1003',
        name: 'cokin',
        family: {
            father: {
                uid: '30001',
                name: 'Bruce'
            },
            mother: {
                uid: '30002',
                name: 'Leda'
            }
        }
    },
    {
        uid: '1006',
        name: '',
        family: {
            father: {
                uid: '30001',
                name: ''
            },
            mother: {
                uid: '30002',
                name: ''
            }
        }
    },
    {
        uid: '1005',
        name: '',
        family: {
            father: {
                uid: '30001',
                name: ''
            },
            mother: {
                uid: '30002',
                name: ''
            }
        }
    }

]

data1 = ['jack', 'cokin', 'tom'];

data1 = Immutable.fromJS(data1);
console.log('Get Index:', data1.indexOf('cokin'));
var isDesc = true;

function sort() {
    isDesc = !isDesc;
    data = Immutable.fromJS(data);

    var names = data.getIn(['family', 'father', 'name']).filter(function(item) {
        return item
    });
    log(names)
    // data = data.sort(function(a, b) {
    //     console.log('a:', a.toJS())
    //     console.log('b:', b.toJS())
    //     console.log('-------------------------------')
    //     if (a.get('name') < b.get('name')) {
    //         return isDesc ? -1 : 1;
    //     }
    //     if (a.get('name') > b.get('name')) {
    //         return isDesc ? 1 : -1;
    //     }
    //     if (a.get('name') === b.get('name')) {
    //         return 0;
    //     }
    // });
}

function log(data) {
    document.getElementById('show').innerHTML = JSON.stringify(data.toJS(), null, 4);
}

window.onload = function() {
    document.getElementById('button').addEventListener('click', sort, false);
}

// var cokin = _.find(data,function(item){
//   return item.uid === '1003'
// })
//
// var index = _.findIndex(data,function(item){
//   console.log(item.uid)
//   return item.uid == 1002
// },0)
//
// var users = [
//   { 'user': 'fred',   'age': 48 },
//   { 'user': 'barney', 'age': 36 },
//   { 'user': 'fred',   'age': 40 },
//   { 'user': 'barney', 'age': 34 }
// ];
//
// var a = _.sortBy(users, [function(o) { return o.user; }]);
//
// console.log('find       :cokin',cokin)
// console.log('find index :uid 1002 \'s index',index)
// console.log('find index :uid 1002 \'s index',a)
