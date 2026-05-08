export const openStateAttributeMapping = (
  open: boolean,
): Record<string, string> =>
  open ? { 'data-open': '' } : { 'data-closed': '' }
