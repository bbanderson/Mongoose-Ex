// npm install mongoose를 하고 require한다.
const mongoose = require('mongoose');

// mongodb 서버에 guitarDB라는 이름의 Database를 기록한다.
mongoose.connect('mongodb://localhost:27017/guitarDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Database 필드 형태를 정의한다. 이 형태를 스키마라고 부른다.
const guitarSchema = new mongoose.Schema({
  name: String,
  company: String,
  price: Number,
});

// 이제 위에서 정의한 스키마를 기반으로 하는 레코드들을 대량생산하기 위한 클래스(모델, 틀)를 정의한다.
// Guitar라는 클래스는 앞으로 생성될 수많은 다양한 guitar 문서(레코드)들이 따라야 할 규약(필드)을 담고 있으며, 그 규약 내용이 바로 위에서 정의한 스키마다.
// 즉 다음 줄은 guitarSchema를 필드로 가지는 각각의 'Guitar' Document(레코드)를 인스턴스화 하기 위한 클래스 모델을 정의하는 명령이다.
const Guitar = new mongoose.model('Guitar', guitarSchema);

// Guitar 클래스(모델)로부터 vintage62라는 Document(레코드)를 하나 생성한다.
const vintage62 = new Guitar({
  name: "Vintage 62 Stratocaster Reissue",
  company: "Fender",
  price: 2000
});

const es335 = new Guitar({
  name: "ES335",
  company: "Gibson",
  price: 1800
});

const angel = new Guitar({
  name: "Angel",
  company: "Tom Anderson",
  price: 4000
});

const burningWater = new Guitar({
  name: "Burning Water",
  company: "James Tyler",
  price: 5000
});

// vintage62.save();
Guitar.insertMany([es335, angel, burningWater], err => {console.log(err? "Failed":"Success");})

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Customer = new mongoose.model('Customer', customerSchema);

const paul = new Customer({
  name: "Paul",
  age: 25
});

// paul.save();
