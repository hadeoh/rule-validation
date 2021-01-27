import { Router } from 'express';
import sendResponse from '../utils/response';
import validateInput from '../middlewares/validator';

const router = Router();

router.get('/', (req, res) => res.status(200).json(sendResponse('My Rule-Validation API', 'success', {
    name: 'Usman Adio',
    github: '@hadeoh',
    email: 'usthmandanfodio@gmail.com',
    mobile: '07081855427',
    twitter: '@hadeoh'
  })
));

router.post('/validate-rule', validateInput, (req, res) => {
    let { rule, data } = req.body;

    let field = rule.field;
    let condition = rule.condition;
    let conditionValue = rule.condition_value;

    let dataField = data[`${field}`];
    if (field.includes(".")) {
        let val1 = field.split(".")[0];
        let val2 =  field.split(".")[1];
        dataField = data[`${val1}`][`${val2}`];
    }

    let valid = false;
    switch (condition) {
        case "eq":
            if (dataField == conditionValue) {
                valid = true;
            }
            break;
        case "neq":
            if (dataField != conditionValue) {
                valid = true;
            }
            break;
        case "gt":
            if (dataField > conditionValue) {
                valid = true;
            }
            break;
        case "gte":
            if (dataField >= conditionValue) {
                valid = true;
            }
            break;
        case "contains":
            if (data.includes(field)) {
                if(dataField.contains(conditionValue)) {
                    valid = true;
                }
            } else {
                return res.status(400).json(sendResponse(`field ${field} is missing from data`, 'error', null));
            }
            break;
    
        default:
            break;
    }

    let dataRes = {
        validation : {
            error: false,
            field,
            field_value: dataField,
            condition,
            condition_value: conditionValue
        }
    }

    if (valid) {
        return res.status(200).json(sendResponse(`field ${field} successfully validated.`, 'success', dataRes));
    }
    dataRes.validation.error = true;
    return res.status(400).json(sendResponse(`field ${field} failed validation.`, 'error', dataRes));
})

export default router;