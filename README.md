# LayerG Gamehub Client SDK

---

## Client Initialization & Authentication

**Example:**

```typescript
import { LayerGGamehubClient, Mode } from "layerg-gamehub-js";

const client = new LayerGGamehubClient({
  apiKey: "apiKey",
  apiKeyId: "apiKeyId",
  mode: Mode.Sandbox, // mode: Defaults to Mode.Production. Choose between Mode.Sandbox (for development/testing) and Mode.Production (live environment).
  clientOptions: {
    retry: 3,
    timeout: 10000,
  },
});

const { isSuccess, error, data } = await client.authenticate();

if (!isSuccess) {
  console.error("Failed to authenticate:", error?.message);
  return;
}

// continue to call asset/collection methods here
```

---

### Asset

#### Methods

##### getByTokenId

```typescript
getByTokenId(input: GetByTokenIdInput): Promise<Result<Asset>>
```

Fetches an asset by token id within a collection.

**Parameters:**

- `input`: GetByTokenIdInput

**Example:**

```typescript
const input: GetByTokenIdInput = {
  collectionId: "COLLECTION_ID",
  tokenId: "TOKEN_ID",
};

const { data, isSuccess, error } = await client.asset.getByTokenId(input);

if (isSuccess) {
  console.log("Asset: ", data);
}
```

##### create

```typescript
create(input: CreateAssetInput): Promise<Result<Asset>>
```

Creates a new asset.

**Parameters:**

- `input`: CreateAssetInput

**Example:**

```typescript
const input: CreateAssetInput = {
  name: "test",
  description: "test",
  tokenId: "TOKEN_ID",
  collectionId: "COLLECTION_ID",
  quantity: "1",
  media: {
    S3Url: "",
  },
  metadata: {
    metadata: {
      attributes: [],
    },
  },
};

const { data, isSuccess, error } = await client.asset.create(input);

if (isSuccess) {
  console.log("Created Asset: ", data);
}
```

##### update

```typescript
update(input: UpdateAssetInput): Promise<Result<Asset>>
```

Updates an existing asset.

**Parameters:**

- `input`: UpdateAssetInput

**Example:**

```typescript
const input: UpdateAssetInput = {
  data: {
    name: "test",
    description: "test",
    tokenId: "TOKEN_ID",
    quantity: "1",
    media: {
      S3Url: "",
    },
    metadata: {
      metadata: {
        attributes: [],
      },
    },
  },
  where: {
    collectionId: "COLLECTION_ID",
    assetId: "ASSET_ID",
  },
};

const { data, isSuccess, error } = await client.asset.update(input);

if (isSuccess) {
  console.log("Updated Asset: ", data);
}
```

##### delete

```typescript
delete(input: DeleteAssetInput): Promise<Result<DeleteAssetSuccessResponse>>
```

Delete an existing asset.

**Parameters:**

- `input`: DeleteAssetInput

**Example:**

```typescript
const input: DeleteAssetInput = {
  collectionId: "COLLECTION_ID",
  tokenId: "TOKEN_ID",
};

const { data, isSuccess, error } = await client.asset.delete(input);

if (isSuccess) {
  console.log("Asset deleted!");
}
```

### Collection

##### get

```typescript
getById(collectionId: string): Promise<Result<Collection>>
```

Fetches a collection by ID.

**Parameters:**

- `collectionId`: string

**Example:**

```typescript
const { data, isSuccess, error } = await client.collection.getById(
  "collectionId"
);

if (isSuccess) {
  console.log("Collection: ", data);
}
```

##### create

```typescript
create(input: CreateCollectionInput): Promise<Result<Collection>>
```

Creates a new collection.

**Parameters:**

- `input`: CreateCollectionInput

**Example:**

```typescript
const input: CreateCollectionInput = {
  name: "test",
  description: "test",
  avatarUrl: "https://example.com/avatar.png",
  projectId: "PROJECT_ID",
  smc: {
    contractAddress: "0x1234567890abcdef",
    contractType: "ERC721",
    networkID: 1,
    tokenSymbol: "TEST",
    totalSupply: 10000,
  },
};

const { data, isSuccess, error } = await client.collection.create(input);

if (isSuccess) {
  console.log("Created Collection: ", data);
}
```

##### update

```typescript
update(input: UpdateCollectionInput): Promise<Result<Collection>>
```

Updates an existing collection.

**Parameters:**

- `input`: UpdateCollectionInput

**Example:**

```typescript
const input: UpdateCollectionInput = {
  data: {
    name: "test",
    description: "test",
    avatarUrl: "https://example.com/avatar.png",
    projectId: "PROJECT_ID",
    smc: {
      contractAddress: "0x1234567890abcdef",
      contractType: "ERC721",
      networkID: 1,
      tokenSymbol: "TEST",
      totalSupply: 10000,
    },
  },
  where: {
    collectionId: "COLLECTION_ID",
  },
};

const { data, isSuccess, error } = await client.collection.update(input);

if (isSuccess) {
  console.log("Updated Collection: ", data);
}
```

##### public

```typescript
public(collectionId: string): Promise<Result<Collection>>
```

Public a collection to the marketplace.

**Parameters:**

- `collectionId`: string — The collection ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.collection.public(
  "collectionId"
);
if (isSuccess) {
  console.log("Collection public: ", data);
}
```

## Error Handling

All methods return `{ data, isSuccess, error }`. If `isSuccess === false`, check `error` to get the error's cause:

```typescript
const { data, isSuccess, error } = await client.asset.get(
  "assetId",
  "collectionId"
);

if (!isSuccess) {
  console.error("Fetched asset error: ", error?.cause);
  return;
}

console.log("Fetched asset successfully: ", data?.id);
```
