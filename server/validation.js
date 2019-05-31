const { check, validationResult, param } = require('express-validator/check');

let createValidationFor = (route) => {
    switch (route) {
        case 'login':
            return [
                check('user_id').not().isEmpty().isLength({ min: 5 }),
                check('password').not().isEmpty().isLength({ min: 4 })
            ];
        case 'addCandidates':
            return [
                check('candidate_id').not().isEmpty().isLength({ min: 5 }),
                check('candidate_name').not().isEmpty(),
                check('candidate_sign').not().isEmpty(),
                check('candidate_party').not().isEmpty(),
            ];
        case 'vote':
        return [
            check('user_id').not().isEmpty(),
            check('candidate_id').not().isEmpty().isLength({ min: 5 }),
        ];
        case 'addUser':
        return [
            check('user_id').not().isEmpty().isLength({ min: 5 }),
            check('user_name').not().isEmpty(),
            check('user_type').not().isEmpty(),
            check('password').not().isEmpty().isLength({ min: 5 }),
        ];
        case 'getOneUser':
        return [
            param('id').not().isEmpty()
        ];
        default:
            return [];
    }
}

let checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.status(422).json({ errors: result.array() });
}

module.exports = {
    createValidationFor, checkValidationResult
}