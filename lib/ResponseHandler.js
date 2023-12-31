
class ResponseHandler {
    constructor(status, success, resp) {
        this.status = status;
        this.success = success;
        this.resp = resp;

        return this.toBlock();
    }

    toBlock = () => {
        return {
            status: this.status,
            payload: {
                success: this.success,
                [this.success ? 'data' : 'message']: this.resp
            }
        }
    }
}

/*
    create a new responseHandler for 'create' status (201)
    call it CreatedRes
    it will be triggered the you POST /users 
    add new function like 'res.ok' that will handler this (eg: 'res.create')
*/

module.exports.ValidRes = (value) => new ResponseHandler(200, true, value);
module.exports.CreatedRes = (value) => new ResponseHandler(201, true, value);
module.exports.ErrNotAuthed = () => new ResponseHandler(401, false, 'You are not authorized');
module.exports.ErrConflict = (errorText) => new ResponseHandler(409, false, errorText ? errorText :"Conflict - Already Exist");
module.exports.ErrUserNotFound = () => new ResponseHandler(404, false, "Not Found - User not found");
module.exports.ErrProductNotFound = (value) => new ResponseHandler(404, false, value ? value : "Not Found - Product not found");

module.exports.ErrSchema = (erros) => new ResponseHandler(422, false, erros);
module.exports.ErrPermissions = () => new ResponseHandler(403, false, "You don't have permissions for it");
