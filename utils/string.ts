export const typeFromMaybeNftType = (type: string) =>
  type.startsWith('nft:') ? type.split('nft:')[1] : type;
