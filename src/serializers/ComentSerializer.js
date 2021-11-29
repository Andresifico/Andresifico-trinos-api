const BaseSerializer = require('./BaseSerializer');

class ComentSerializer extends BaseSerializer {
  constructor(model) {
    const serializedModel = model ? model.toJSON() : null;
    super('success', serializedModel);
  }
}

module.exports = ComentSerializer;
