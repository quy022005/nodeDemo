module.exports = {
    mutipleMongooseToObject : function(mongooses){
/*
method toObject() provided from mongooses chuyển đổi tài
liệu Mongoose (phiên bản của mô hình Mongoose) thành các
đối tượng JavaScript đơn giản.
*/
        return mongooses.map(mongoose => mongoose.toObject());
/*
Trả về một mảng mới chứa các đối tượng đơn giản.
*/
    },
    // cần fix lỗi này: k phải là function
    mongooseToObject : function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }

};

/*toObject()là một phương thức dành riêng cho Mongoose, không phải là phương thức JavaScript tích hợp.
Nó tạo một bản sao dữ liệu của tài liệu, không sửa đổi đối tượng Mongoose ban đầu.
Nó loại trừ các thuộc tính và phương thức dành riêng cho Mongoose, dẫn đến một đối tượng JavaScript đơn giản.
*/

/*Ghi chú bổ sung:

Hãy cân nhắc sử dụng lean()trong truy vấn Mongoose để tìm nạp tài liệu dưới dạng đối tượng đơn giản trực tiếp từ cơ sở dữ liệu, có khả năng cải thiện hiệu suất.
Hãy lưu ý đến những tác động tiềm ẩn về hiệu suất khi chuyển đổi số lượng lớn tài liệu sang đối tượng đơn giản.
*/