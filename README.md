# LayerG Gamehub Client SDK

---

## Client Initialization & Authentication

**Example:**

```typescript
import { LayerGGamehubClient, Environment } from "layerg-gamehub-client";

const client = new LayerGGamehubClient(
  "apiKey",
  "apiKeyId",
  Environment.Dev,
  { retry: 3, timeout: 10000 }
);

await client.authenticate();

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

**Returns:**

- Promise resolving to an Asset or Error.

**Example:**

```typescript
const asset = await client.assets.getAsset("assetId", "collectionId");
console.log("Asset:", asset);
```

##### createAsset

```typescript
createAsset(input: CreateAssetInput): Promise<Asset>
```

Creates a new asset.

**Parameters:**

- `input`: CreateAssetInput — Asset creation details.

**Returns:**

- Promise resolving to the created Asset or Error.

**Example:**

```typescript
const newAsset = await client.assets.createAsset({
  name: "New Sword",
  collectionId: "collectionId",
  // ... other fields
});
console.log("Created Asset:", newAsset);
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

**Returns:**

- Promise resolving to the updated Asset or Error.

**Example:**

```typescript
const updated = await client.assets.updateAsset(
  { name: "Updated Sword" },
  "collectionId",
  "assetId"
);
console.log("Updated Asset:", updated);
```

##### getCollection

```typescript
getCollection(collectionId: string): Promise<Collection>
```

Fetches a collection by ID.

**Parameters:**

- `collectionId`: string — The collection ID.

**Returns:**

- Promise resolving to a Collection or Error.

**Example:**

```typescript
const collection = await client.collections.getCollection("collectionId");
console.log("Collection:", collection);
```

##### createCollection

```typescript
createCollection(input: UpsertCollectionInput): Promise<Collection>
```

Creates a new collection.

**Parameters:**

- `input`: UpsertCollectionInput — Collection creation details.

**Returns:**

- Promise resolving to the created Collection or Error.

**Example:**

```typescript
const newCollection = await client.collections.createCollection({
  name: "Epic Collection",
  description: "A set of rare items",
  // ... other fields
});
console.log("Created Collection:", newCollection);
```

##### updateCollection

```typescript
updateCollection(input: UpsertCollectionInput, collectionId: string): Promise<Collection>
```

Updates an existing collection.

**Parameters:**

- `input`: UpsertCollectionInput — Collection update details.
- `collectionId`: string — Collection ID.

**Returns:**

- Promise resolving to the updated Collection or Error.

**Example:**

```typescript
const updated = await client.collections.updateCollection(
  { name: "Updated Collection" },
  "collectionId"
);
console.log("Updated Collection:", updated);
```

##### publicCollection

```typescript
publicCollection(collectionId: string): Promise<boolean>
```

Marks a collection as public.

**Parameters:**

- `collectionId`: string — The collection ID.

**Returns:**

- Promise resolving to a boolean indicating success.

**Example:**

```typescript
const success = await client.collections.publicCollection("collectionId");
console.log("Collection published:", success);
```

## Error Handling

All methods return either the expected result or an Error object. Always check results:

```typescript
try {
  const asset = await client.assets.getAsset("assetId", "collectionId");
  console.log("Fetched asset:", asset);
} catch (err: any) {
  if (err instanceof LayerGError) {
    console.error("LayerG SDK Error:", err.message);
    if (err.cause) {
      console.error("Details:", err.cause);
    }
  } else {
    console.error("Unknown Error:", err);
  }
}
```
