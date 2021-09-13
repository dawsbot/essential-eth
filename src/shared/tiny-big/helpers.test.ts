import { scientificStrToDecimalStr } from './helpers';

describe('scientificStrToDecimalStr', () => {
  it('not even scientific', () => {
    expect(scientificStrToDecimalStr('010')).toStrictEqual('10');
    expect(scientificStrToDecimalStr('-010')).toStrictEqual('-10');
  });
  it('zero power', () => {
    expect(scientificStrToDecimalStr('10e0')).toStrictEqual('10');
    expect(scientificStrToDecimalStr('1.0e0')).toStrictEqual('1');
    expect(scientificStrToDecimalStr('-10e-0')).toStrictEqual('-10');
    expect(scientificStrToDecimalStr('-1.0e-0')).toStrictEqual('-1');
    expect(scientificStrToDecimalStr('-1.10e-0')).toStrictEqual('-1.1');
    expect(scientificStrToDecimalStr('-1.e-0')).toStrictEqual('-1');
    expect(scientificStrToDecimalStr('.10e-0')).toStrictEqual('0.1');
    expect(scientificStrToDecimalStr('00.0010e-0')).toStrictEqual('0.001');
  });
  it('negative power', () => {
    expect(scientificStrToDecimalStr('0100e-2')).toStrictEqual('1');
    expect(scientificStrToDecimalStr('0100e-4')).toStrictEqual('0.01');
    expect(scientificStrToDecimalStr('010.1e-3')).toStrictEqual('0.0101');
    expect(scientificStrToDecimalStr('-010.1e-3')).toStrictEqual('-0.0101');
    expect(scientificStrToDecimalStr('09.1e-51')).toStrictEqual(
      `0.${'0'.repeat(50)}91`,
    );
  });
  it('positive power', () => {
    expect(scientificStrToDecimalStr('01e2')).toStrictEqual('100');
    expect(scientificStrToDecimalStr('-01e2')).toStrictEqual('-100');
    expect(scientificStrToDecimalStr('09.1e51')).toStrictEqual(
      `91${'0'.repeat(50)}`,
    );
  });
});
