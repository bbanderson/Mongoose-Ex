// npm install mongoose를 하고 require한다.
const mongoose = require('mongoose');

// mongodb 서버에 guitarDB라는 이름의 Database를 기록한다.
mongoose.connect('mongodb://localhost:27017/guitarDB', {useNewUrlParser: true, useUnifiedTopology: true});

// SQL로 생각하면 "테이블"과 그 스키마를 정의하는 부분이다. 즉 필드 형태를 정의하는 것이다.
const guitarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "how could it be noname?"]
  },
  company: {
    type: String
  },
  price: {
    type: Number,
    min: 1000,
    max: 10000
  },
});

// 이제 위에서 정의한 스키마를 기반으로 하는 레코드들을 대량생산하기 위한 클래스(모델, 틀)를 정의한다.
// Guitar라는 클래스는 앞으로 생성될 수많은 다양한 guitar 문서(레코드)들이 따라야 할 규약(필드)을 담고 있으며, 그 규약 내용이 바로 위에서 정의한 스키마다.
// 즉 다음 줄은 guitarSchema를 필드로 가지는 각각의 'Guitar' Document(레코드)를 인스턴스화 하기 위한 클래스 모델을 정의하는 명령이다.
const Guitar = new mongoose.model('Guitar', guitarSchema);

// ********** CREATE **********
// Guitar 클래스(모델)로부터 vintage62라는 Document(레코드)를 하나 생성한다.
const vintage62 = new Guitar({
  name: "Vintage 62 Stratocaster Reissue",
  company: "Fender",
  price: 2000
});

// 레코드를 한개만 INSERT 하려면 해당 레코드에 대해 아래와 같이 .save() 메서드를 이용한다.
// vintage62.save();

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

// 여러 레코드를 한번에 INSERT 하려면 클래스 모델에 대해 .insertMany()함수를 이용하여 배열로 넣는다. 이때 2번째 인자로 콜백함수를 넣어 에러를 처리하도록 하자.
// Guitar.insertMany([es335, angel, burningWater], err => {console.log(err? "Failed":"Success");})


// 또 다른 테이블이 필요하면 그 스키마와 함께 정의하면 된다. 이하 상기 동일
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


// ********** READ **********
// Guitar.find((err, guitars) => err ? console.log(err) : guitars.forEach(item => {
//   console.log(item);
//   mongoose.connection.close();
// }))

// ********** UPDATE **********
// Guitar.updateOne({_id: "5ebb5b5aabe5f90775832740"}, {price: 8000}, (err)=> err? console.log(err):console.log("Update Complete!"))

// ********** DELETE **********
// Guitar.deleteOne({_id: "5ebb5b5aabe5f90775832740"}, err => err? console.log(err) : console.log("Deleted!"))
Customer.deleteMany({name: /Paul/}, err => err ? console.log(err) : console.log("Deleted!"))