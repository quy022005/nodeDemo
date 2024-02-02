
const Course = require('./models/Course');

class CourseController {
    
    // [GET] /news/courses/:slugnp
    show(req, res,next) {
        Course.findOne({ slug: req.params.slug }).lean()
           .then(course => 
                res.render('courses/show', { course })
           ) 
           .catch(next);
    }
    // [GET] /news/courses/create
    create(req, res,next) {
        res.render('courses/create')
    }
    // [GET] /news/courses/store
    store(req, res,next) {
        // cần fix để hiện ra ảnh

        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);

        
            
    }
    // [GET] /news/courses/:id/edit
    edit(req, res,next) {
        Course.findById(req.params.id).lean()
            .then(course => res.render('courses/edit',{course}))
            .catch(next);
    }
    update(req,res,next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    
    destroy(req,res,next){
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [DELETE] /courses/:id/force
    forceDestroy(req,res,next){
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req,res,next){
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormAction(req,res,next){
        

        switch(req.body.action){
            case 'delete':
                // {_id: {$in: req.body.courseIds}} là gì
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                    break;
            default: 
                res.json({message: 'Action is invalid'});

        }
    }
}


module.exports = new CourseController();