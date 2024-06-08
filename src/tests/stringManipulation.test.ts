import { queryStringToJSON } from "../utils/index";


describe('queryStringToJSON', () => {
  test('should convert a simple query string to JSON', () => {
    const queryString = 'key1=value1&key2=value2';
    const expected = {
      key1: 'value1',
      key2: 'value2'
    };
    expect(queryStringToJSON(queryString)).toEqual(expected);
  });

  test('should decode URI components', () => {
    const queryString = 'key1=value%201&key2=value%202';
    const expected = {
      key1: 'value 1',
      key2: 'value 2'
    };
    expect(queryStringToJSON(queryString)).toEqual(expected);
  });

  test('should handle empty values', () => {
    const queryString = 'key1=&key2=value2';
    const expected = {
      key1: '',
      key2: 'value2'
    };
    expect(queryStringToJSON(queryString)).toEqual(expected);
  });

  test('should handle empty query string', () => {
    const queryString = '';
    const expected = {};
    expect(queryStringToJSON(queryString)).toEqual(expected);
  });

  test('should handle keys without values', () => {
    const queryString = 'key1&key2=value2';
    const expected = {
      key1: '',
      key2: 'value2'
    };
    expect(queryStringToJSON(queryString)).toEqual(expected);
  });

  test('should handle complex query string', () => {
    const queryString = 'key1=value1&key2=&key3=value%203&key4';
    const expected = {
      key1: 'value1',
      key2: '',
      key3: 'value 3',
      key4: ''
    };
    expect(queryStringToJSON(queryString)).toEqual(expected);
  });
});
