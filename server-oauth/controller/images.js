const images = require('../resources/resources');

module.exports = (req, res) => {
  //걍 필요 없는 파일이에요 유어클래스의 잔재
  
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(403).send({
      'message': 'no permission to access resources'
    });
  } else {
    res.status(200).json({images: images});
  }
}