// const { index } = require('./NewsController');
const Course = require('./models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /news
    // khi loi ay lai file nay
    // async index(req, res) {
    //     try {
    //         const Courses = await Course.find({});
    //         res.json(Courses);
    //     } catch (error) {
    //         res.status(400).json({ error: 'ERROR!!!' });
    //     }
    // }
    index(req,res,next){

        Course.find({})
            .then(courses => {
                res.render('home',{
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }

    // [GET] /search
    async search(req, res, next) {
        try {
          const course = await Course.findOne({ slug: req.params.slug }).lean();
          if (!course) {
            throw new Error("Không tìm thấy khóa học");
          }
          res.render("courses/search", { course });
        } catch (error) {
          next(error); // Gửi lỗi đến middleware xử lý lỗi
        }
      }
      
      
    
}

module.exports = new SiteController();