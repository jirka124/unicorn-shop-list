class Validator {
  async validate(schema, input) {
    let validIn = null;
    try {
      validIn = await schema.validateAsync(input);
    } catch (e) {
      console.error(e);
      throw new Error("b5eE49De81e38ae7");
    }

    return validIn;
  }
}

module.exports = new Validator();
