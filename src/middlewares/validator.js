import helper from './Helper';

const validateInput = (req,res,next) => {
    let {rule, data} = req.body;

    let errors = [];

    let isNotValid;

    isNotValid = helper.checkFieldEmpty(rule, 'rule');
    if (isNotValid) errors.push(isNotValid);

    isNotValid = helper.checkFieldEmpty(data, 'data');
    if (isNotValid) errors.push(isNotValid);

    if (errors.length > 0) return res.status(400).json(errors[0]);

    isNotValid = helper.checkFieldObject(rule, 'rule');
    if (isNotValid) errors.push(isNotValid);

    if (errors.length > 0) return res.status(400).json(errors[0]);

    isNotValid = helper.checkDataField(data, rule.field);
    if (isNotValid) errors.push(isNotValid);

    if (errors.length > 0) return res.status(400).json(errors[0]);

    req.body.rule = rule;
    req.body.data = data;

    next();
}

export default validateInput;