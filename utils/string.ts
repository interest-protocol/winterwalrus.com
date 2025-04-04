export const typeFromMaybeNftType = (type: string) =>
  type?.startsWith('nft:') ? type.split('nft:')[1] : type;

export const nftTypeFromType = (type: string) =>
  type?.startsWith('nft:') ? type : `nft:${type}`;
