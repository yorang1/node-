let mysql = require('mysql')
let options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'mall'
}

const con  = mysql.createConnection(options)
con.connect((err) => {
  if (err){
    console.log(err);
  } else {
    console.log('连接成功');
  }
})
// let strSql = 'select * from student'
// let strSql = 'show databases'
// let strSql = 'show tables'
// let strSql = 'select * from user'
// con.query(('SELECT * from student', (err, results, fields) => {
//   console.log(err);
//   console.log(results);
//   console.log(fields);
// }))
// con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
//   console.log('The solution is: ', results);
// });

// 删除表
// con.query('drop table newTable', (err, results) => {
//   console.log(err);
//   console.log(results);
// })

// 删除库
// con.query('drop database test1', (err, results) => {
//   console.log(err);
//   console.log(results);
// })

// 创建库
// con.query('create database mall', (err, results) => {
//   console.log(err);
//   console.log(results);
// })

//创建表
// let strSql = 'CREATE TABLE `mall`.`user`  (`id` int(0) NOT NULL,`username` varchar(255) NULL,`password` varchar(255) NULL,`mail` varchar(255) NULL, PRIMARY KEY (`id`))';
// con.query(strSql, (err, results) => {
//   console.log(err);
//   console.log(results);
// })

// 插入数据
// let strSql1 = "INSERT INTO user ( id, username, password)VALUES(12,'xg','6789')"
// // let strSql1  = "INSERT INTO user (id,username, password, mail)VALUES('老陈','xg','6789@123.com')" // ? id无法自增
// con.query(strSql1, (err, results) => {
//   console.log(err);
//   console.log(results); 
// })

var addSql = 'INSERT INTO user(id,username,password,mail) VALUES(?,?,?,?)';
var addSqlParams = ['12','股票大魔法师啊',(Math.random() * 10000).toFixed(),(Math.random() * 1000000).toFixed()+'@qq.com'];
con.query(addSql,addSqlParams, (err, results) => {
  console.log(err);
  console.log(results);
})