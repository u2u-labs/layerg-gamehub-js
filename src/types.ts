import {
  AuthError,
  BadRequestError,
  NetworkError,
  NotFoundError,
  RateLimitError,
  SDKError,
  ServerError,
  TimeoutError,
} from "./error";

export enum Mode {
  Sandbox = "Sandbox",
  Production = "Production",
}

export type ClientOptions = {
  retry: number;
  timeout: number;
};

export interface Asset {
  id: string;
  tokenId: string;
  collectionId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  mediaStorageId: string;
  metaDataId: string;
  nameSlug: string;
  slug: string;
  quantity: number;
  apiKeyID: string;
  media: Media;
  metadata: Metadata;
  image: string;
  attributes: Attribute[];
  external_url: string;
  collection: CollectionInfo;
}

export interface CollectionInfo {
  name: string;
  description: string;
  address: string;
}

export interface CreateAssetInput {
  name: string;
  description: string;
  tokenId?: string;
  collectionId: string;
  quantity: string;
  media: Media;
  metadata: Metadata;
}

export interface UpdateAssetInput {
  data: {
    name: string;
    description: string;
    tokenId?: string;
    quantity: string;
    media: Media;
    metadata: Metadata;
  };
  where: {
    collectionId: string;
    assetId: string;
  };
}

export interface Media {
  S3Url: string;
}

export interface Metadata {
  metadata: InnerMetadata;
}

export interface InnerMetadata {
  attributes: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface Collection {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalAssets: number;
  name: string;
  description: string;
  avatarUrl: string;
  projectId: string;
  nameSlug: string;
  slug: string;
  apiKeyID: string;
  isPublic: boolean;
  project: Project;
  SmartContract: SmartContract[];
}

export interface UpdateCollectionData {
  name: string;
  description: string;
  avatarUrl: string;
  projectId: string;
  smc: SMC;
}

export interface CreateCollectionInput extends UpdateCollectionData {}

export interface UpdateCollectionInput {
  data: UpdateCollectionData;
  where: {
    collectionId: string;
  };
}

export interface SMC {
  contractAddress: string;
  contractType: string;
  networkID: number;
  tokenSymbol: string;
  totalSupply: number;
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  isEnabled: boolean;
  countFav: number;
  platform: string[];
  totalCls: number;
  name: string;
  gameIcon: string;
  banner: string;
  apiKeyID: string;
  telegram: string;
  facebook: string;
  instagram: string;
  discord: string;
  twitter: string;
  nameSlug: string;
  avatar: string;
  description: string;
  information: string;
  policy: string;
  version: string;
  slideShow: string[];
  totalReview: number;
  totalRating: number;
  slug: string;
  isRcm: boolean;
  userId?: string; // nullable
  mode?: string; // nullable
  index?: number; // nullable
  platformLink: PlatformLink;
}

export interface PlatformLink {
  iOS: string;
  macOS: string;
  android: string;
  windows: string;
}

export interface SmartContract {
  id: string;
  updatedAt: string;
  contractAddress: string;
  contractType: string;
  networkID: number;
  contractName: string;
  tokenSymbol: string;
  totalSupply?: number; // nullable
  collectionId: string;
  deployedAt?: string; // nullable
  nameSlug: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpire: number;
  refreshTokenExpire: number;
}

export type Result<T> = {
  data?: T;
  isSuccess: boolean;
  error?: SDKError;
};

export interface GetByTokenIdInput {
  tokenId: string;
  collectionId: string;
}

export interface DeleteAssetInput {
  tokenId: string;
  collectionId: string;
}

export interface DeleteAssetSuccessResponse {
  message: string;
}

export type KnownErrors =
  | AuthError
  | NetworkError
  | TimeoutError
  | RateLimitError
  | BadRequestError
  | NotFoundError
  | ServerError;
