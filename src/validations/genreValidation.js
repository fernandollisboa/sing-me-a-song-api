import Joi from 'joi';

const genreSchema = Joi.object().keys({
  name: Joi.string().required(),
});

export default genreSchema;
