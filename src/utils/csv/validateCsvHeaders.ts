interface IValidateHeader {
  expectedHeaders: Array<string>;
  foundHeaders: Array<string>;
}

export function validateHeader(props: IValidateHeader): boolean {
  const { expectedHeaders, foundHeaders } = props;
  if (
    expectedHeaders.length !== foundHeaders.length ||
    !expectedHeaders.every((h) => foundHeaders.includes(h))
  ) {
    return false;
  }
  return true;
}
