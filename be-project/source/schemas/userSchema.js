export const createUser = {
    type:       'object',
    properties: {
        name: {
            type:      'string',
            minLength: 3,
        },
        email: {
            type:   'string',
            format: 'email',
        },
        password: {
            type:   'string'
        }
    },
    required:             [ 'name', 'email', 'password'],
    additionalProperties: false,
};
