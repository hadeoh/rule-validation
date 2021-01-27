import dotenv from 'dotenv';
import sendResponse from '../utils/response'

dotenv.config();

/**
 *
 * @exports
 * @class Helper
 */
class Helper {

  /**
   * Checks if input provided is empty
   *
   * @param {string} value value to be validated
   * @param {string} field field name of the value to be validated
   * @returns {object|boolean} error object or boolean
   */
  static checkFieldEmpty(value, field) {
    if (!value) {
        return sendResponse(`${field} is required.`, 'error', null);
    }
    return false;
  }

  /**
   * Checks if input provided is alphabetical
   *
   * @param {string} value value to be validated
   * @param {string} field field name of the value to be validated
   * @returns {object|boolean} error object or boolean
   */
  static checkFieldAlpha(value, field) {
    const pattern = /^[a-zA-Z]+$/;
    if (!pattern.test(value)) {
        return sendResponse(`${field} should be a string.`, 'error', 'null');
    }
    return false;
  }

  /**
   * Checks if input provided is numerical
   *
   * @param {string} value value to be validated
   * @param {string} field field name of the value to be validated
   * @returns {object|boolean} error object or boolean
   */

  static checkFieldNumber(value, field) {
    if (!Number(value)) {
        return sendResponse(`${field} should be a number.`, 'error', null);
    }
    return false;
  }

  /**
   * Checks if input provided is an object
   *
   * @param {string} value value to be validated
   * @param {string} field field name of the value to be validated
   * @returns {object|boolean} error object or boolean
   */

  static checkFieldObject(value, field) {
    if (typeof value !== 'object') {
        return sendResponse(`${field} should be an object.`, 'error', null)
    }
    return false;
  }

  static checkDataField(obj, value) {
    if (Array.isArray(obj)) {
        return false;
    }
    if (value.includes(".")) {
        let val1= value.split(".")[0];
        let val2 = value.split(".")[1];
        if (!obj[`${val1}`][`${val2}`]) {
            return sendResponse(`field ${value} is missing from data.`, 'error', null);
        }
        return false;
    }
    if (!obj[`${value}`]) {
        return sendResponse(`field ${value} is missing from data.`, 'error', null);
    }
    return false;
  }

  static checkValidJSON(obj) {
      try {
          JSON.parse(obj);
          return false;
      } catch (error) {
        return sendResponse(`Invalid JSON payload passed.`, 'error', null);
      }
  }

}

export default Helper;