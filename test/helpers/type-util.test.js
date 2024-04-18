const { isObject, isDate } = require("../../helpers/type-util");

describe("TEST: isObject()", () => {
  test("input: { foo: 'bar' }", () => {
    expect(isObject({ foo: "bar" })).toBe(true);
  });
  test("input: {}", () => {
    expect(isObject({ foo: "bar" })).toBe(true);
  });
  test("input: undefined", () => {
    expect(isObject(undefined)).toBe(false);
  });
  test("input: null", () => {
    expect(isObject(null)).toBe(false);
  });
  test("input: []", () => {
    expect(isObject([])).toBe(false);
  });
  test("input: 'ahoj'", () => {
    expect(isObject("ahoj")).toBe(false);
  });
  test("input: 5", () => {
    expect(isObject(5)).toBe(false);
  });
});

describe("TEST: isDate()", () => {
  test("input: new Date()", () => {
    expect(isDate(new Date())).toBe(true);
  });
  test("input: new Date('string')", () => {
    expect(isDate(new Date("2024-04-18T16:29:23.199Z"))).toBe(true);
  });
  test("input: new Date(timestamp)", () => {
    expect(isDate(new Date(1713457778549))).toBe(true);
  });
  test("input: new Date(undefined)", () => {
    expect(isDate(new Date(undefined))).toBe(false);
  });
  test("input: new Date('wrong_string')", () => {
    expect(isDate(new Date("4.9.2018--13:20:00"))).toBe(false);
  });
  test("input: 784", () => {
    expect(isDate(784)).toBe(false);
  });
  test("input: null", () => {
    expect(isDate(null)).toBe(false);
  });
  test("input: NaN", () => {
    expect(isDate(NaN)).toBe(false);
  });
});
