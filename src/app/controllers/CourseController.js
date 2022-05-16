const Course = require('../models/Course');

class CourseController {
    //[GET] courses/show
    async index(req, res, next) {
        const course = await Course.find({})
        res.json({status: 'success',course: course});
    }
    //[POST] courses/create
    async create(req, res) {
        const name = req.body.name;
        const description = req.body.description;
        const image = req.body.image;
        const videoId = req.body.videoId;
        const level = req.body.level;
        const data  = await Course.create({
            name: name,
            description: description,
            image : image,
            videoId: videoId,
            level: level,
        })
        res.json(data);
    }

    //[GET] courses/total
    async total(req, res) {
         const courses = await Course.find({})
                const totalCoin = await courses.reduce((total, course) => {
                    return total + course.coin;
                },0)
                res.json(totalCoin);
    }
}
module.exports = new CourseController;
