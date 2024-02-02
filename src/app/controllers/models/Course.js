const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: {type : Number,},
    name: {type:String, required: true},
    videoId: {type:Array, required: true},
    linkImage: {type:String, required: true},
    level: {type:String},
    description: {type:String},
    image: {type:String},
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    _id: false,
    timestamps: true,
  });

  // custom query helpers

  CourseSchema.query.sortable = function(req){
/*hasOwnProperty là 1 phương thức sử dụng trong object,
mục đích: để tìm trong object đó có key nào mà mik mún k,
trả về: kiểu boolen
*/
    if(req.query.hasOwnProperty('_sort')) {
      const isValidtype = ['asc','desc'].includes(req.query.type);
      return this.sort({
        // [req.query.column] là
          [req.query.column]: isValidtype ? req.query.type : 'desc',
      });
    
    }
    return this;
  }

  // add plugins
  mongoose.plugin(slug);

  CourseSchema.plugin(AutoIncrement);
  CourseSchema.plugin(mongooseDelete,{ 
    deletedAt: true,
    overrideMethods: 'all',
   });

  
  /*1.Mỗi tệp JavaScript trong Node.js đều là một mô-đun.
    2.Mỗi mô-đun có một moduleđối tượng với một exportsthuộc tính.
    3.Thuộc module.exportstính ban đầu chứa một đối tượng trống.
    4.Bạn chỉ định các giá trị hoặc hàm bạn muốn xuất sang module.exports.
    5.Sau đó, các mô-đun khác có thể nhập các phần tử đã xuất đó bằng cách sử dụng require().*/
  module.exports = mongoose.model('Course', CourseSchema);
  