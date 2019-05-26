module.exports = {
    checkBody:function (body, params) {
        for (each of params) {
            if (!(each in body)) {
                return false;
            }
        }
        return true;
    }
}