import Joi from 'joi';

const recommendationSchema = Joi.object().keys({
  name: Joi.string().required(),
  youtubeLink: Joi.string()
    .required()
    .pattern(
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
    ),
  genresIds: Joi.array().items(Joi.number().integer().required()).required(),
});

const idSchema = Joi.object({ id: Joi.number().integer().required() });

export { recommendationSchema, idSchema };
