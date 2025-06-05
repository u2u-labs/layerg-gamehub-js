# LayerG Gamehub Client SDK

---

## Client Initialization & Authentication

**Example:**

```typescript
import { LayerGGamehubClient, Environment } from "layerg-gamehub-js";

const client = new LayerGGamehubClient({
  apiKey: "apiKey",
  apiKeyId: "apiKeyId",
  env: Environment.Dev,
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

##### get

```typescript
get(assetId: string, collectionId: string): Promise<Result<Asset>>
```

Fetches an asset by ID within a collection.

**Parameters:**

- `assetId`: string — The asset ID.
- `collectionId`: string — The collection ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.asset.get(
  "assetId",
  "collectionId"
);
console.log("Asset: ", data);
```

##### create

```typescript
create(input: CreateAssetInput): Promise<Result<Asset>>
```

Creates a new asset.

**Parameters:**

- `input`: CreateAssetInput — Asset creation details.

**Example:**

```typescript
const { data, isSuccess, error } = await client.asset.create({
  name: "New Sword",
  collectionId: "collectionId",
  // ... other fields
});
console.log("Created Asset: ", data);
```

##### update

```typescript
update(input: UpdateAssetInput, collectionId: string, assetId: string): Promise<Result<Asset>>
```

Updates an existing asset.

**Parameters:**

- `input`: UpdateAssetInput — Asset update details.
- `collectionId`: string — Collection ID.
- `assetId`: string — Asset ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.asset.update(
  { name: "Updated Sword" },
  "collectionId",
  "assetId"
);
console.log("Updated Asset: ", data);
```

### Collection

##### get

```typescript
get(collectionId: string): Promise<Result<Collection>>
```

Fetches a collection by ID.

**Parameters:**

- `collectionId`: string — The collection ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.collection.get("collectionId");
console.log("Collection: ", data);
```

##### create

```typescript
create(input: UpsertCollectionInput): Promise<Result<Collection>>
```

Creates a new collection.

**Parameters:**

- `input`: UpsertCollectionInput — Collection creation details.

**Example:**

```typescript
const { data, isSuccess, error } = await client.collection.create({
  name: "Epic Collection",
  description: "A set of rare items",
  // ... other fields
});
console.log("Created Collection: ", data);
```

##### update

```typescript
update(input: UpsertCollectionInput, collectionId: string): Promise<Result<Collection>>
```

Updates an existing collection.

**Parameters:**

- `input`: UpsertCollectionInput — Collection update details.
- `collectionId`: string — Collection ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.collection.update(
  { name: "Updated Collection" },
  "collectionId"
);
console.log("Updated Collection: ", data);
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
console.log("Collection public: ", data);
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
