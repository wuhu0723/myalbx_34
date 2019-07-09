// 所有与options表相关的操作
var optionsModule = require('../modules/optionsModule')
exports.addMenu = (req, res) => {
    var obj = req.body
    obj.icon = 'fa fa-glass'
    optionsModule.addMenu(obj, (err) => {
        if (err) {
            res.json({
                code: 400,
                msg: '数据新增失败'
            })
        } else {
            res.json({
                code: 200,
                msg: '数据新增成功'
            })
        }
    })
}