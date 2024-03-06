import { existsErrorMessage } from './exist';
import { isUniqueErrorMessage } from './isUnique';



export const joiCustomMessages: {[key: string]: string} = {
    ...existsErrorMessage,
    ...isUniqueErrorMessage
};

