# LayerG Gamehub Client SDK

---

## Client Initialization & Authentication

**Example:**

```typescript
import { LayerGGamehubClient, Environment } from "layerg-gamehub-client";

const client = new LayerGGamehubClient("apiKey", "apiKeyId", Environment.Dev, {
  retry: 3,
  timeout: 10000,
});

const { isSuccess, error, data } = await client.authenticate();

if (!isAuthenticateSuccess) {
  console.error("Failed to authenticate:", error?.message);
  return;
}

// continue to call assets/collections methods here
```

---

#### Methods

##### getAsset

```typescript
getAsset(assetId: string, collectionId: string): Promise<Asset>
```

Fetches an asset by ID within a collection.

**Parameters:**

- `assetId`: string — The asset ID.
- `collectionId`: string — The collection ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.assets.getAsset(
  "assetId",
  "collectionId"
);
console.log("Asset: ", data);
```

##### createAsset

```typescript
createAsset(input: CreateAssetInput): Promise<Asset>
```

Creates a new asset.

**Parameters:**

- `input`: CreateAssetInput — Asset creation details.

**Example:**

```typescript
const { data, isSuccess, error } = await client.assets.createAsset({
  name: "New Sword",
  collectionId: "collectionId",
  // ... other fields
});
console.log("Created Asset: ", data);
```

##### updateAsset

```typescript
updateAsset(input: UpdateAssetInput, collectionId: string, assetId: string): Promise<Asset>
```

Updates an existing asset.

**Parameters:**

- `input`: UpdateAssetInput — Asset update details.
- `collectionId`: string — Collection ID.
- `assetId`: string — Asset ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.assets.updateAsset(
  { name: "Updated Sword" },
  "collectionId",
  "assetId"
);
console.log("Updated Asset: ", data);
```

##### getCollection

```typescript
getCollection(collectionId: string): Promise<Collection>
```

Fetches a collection by ID.

**Parameters:**

- `collectionId`: string — The collection ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.collections.getCollection(
  "collectionId"
);
console.log("Collection: ", data);
```

##### createCollection

```typescript
createCollection(input: UpsertCollectionInput): Promise<Collection>
```

Creates a new collection.

**Parameters:**

- `input`: UpsertCollectionInput — Collection creation details.

**Example:**

```typescript
const { data, isSuccess, error } = await client.collections.createCollection({
  name: "Epic Collection",
  description: "A set of rare items",
  // ... other fields
});
console.log("Created Collection: ", data);
```

##### updateCollection

```typescript
updateCollection(input: UpsertCollectionInput, collectionId: string): Promise<Collection>
```

Updates an existing collection.

**Parameters:**

- `input`: UpsertCollectionInput — Collection update details.
- `collectionId`: string — Collection ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.collections.updateCollection(
  { name: "Updated Collection" },
  "collectionId"
);
console.log("Updated Collection: ", data);
```

##### publicCollection

```typescript
publicCollection(collectionId: string): Promise<boolean>
```

Marks a collection as public.

**Parameters:**

- `collectionId`: string — The collection ID.

**Example:**

```typescript
const { data, isSuccess, error } = await client.collections.publicCollection(
  "collectionId"
);
console.log("Collection published: ", data);
```

## Error Handling

All methods return `{ data, isSuccess, error }`:

```typescript
const { data, isSuccess, error } = await client.assets.getAsset(
  "assetId",
  "collectionId"
);

if (!isSuccess) {
  console.error("Fetched asset error: ", error?.cause);
  return;
}

console.log("Fetched asset successfully: ", data?.id);
```
