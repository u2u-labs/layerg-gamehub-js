
# LayerG Gamehub Client SDK

The **layerg-gamehub-client** package provides robust APIs for interacting with the LayerG Gamehub system. It offers developers tools to authenticate, manage assets, and manage collections through organized modules.

---

## LayerGGamehubClient

The main orchestrator class providing access to asset and collection management modules.

---

## Modules

### AssetClient

APIs for managing game assets.

#### Methods

##### getAsset

**Signature:**

```typescript
getAsset(assetId: string, collectionId: string): Promise<Asset | Error>
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

**Signature:**

```typescript
createAsset(input: CreateAssetInput): Promise<Asset | Error>
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

**Signature:**

```typescript
updateAsset(input: UpdateAssetInput, collectionId: string, assetId: string): Promise<Asset | Error>
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

---

### CollectionClient

APIs for managing game asset collections.

#### Methods

##### getCollection

**Signature:**

```typescript
getCollection(collectionId: string): Promise<Collection | Error>
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

**Signature:**

```typescript
createCollection(input: UpsertCollectionInput): Promise<Collection | Error>
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

**Signature:**

```typescript
updateCollection(input: UpsertCollectionInput, collectionId: string): Promise<Collection | Error>
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

**Signature:**

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

---

## Authentication

The client automatically handles:

- Initial login (`/auth/login`)
- Access token refresh (`/auth/refresh`)
- Full reauthentication if the refresh token expires

You don’t need to manage tokens manually.

---

## Retry Handling

All requests:

- Use an internal `withRetry()` mechanism
- Retry up to the `retry` count defined in ClientOptions
- Log retry attempts to the console

---

## Client Initialization

**Example:**

```typescript
import { LayerGGamehubClient } from "layerg-gamehub-client";

const client = new LayerGGamehubClient(
  "apiKey",
  "apiKeyId",
  "production", // or "development", "staging"
  { retry: 3, timeout: 10000 }
);
```

---

## Error Handling

All methods return either the expected result or an Error object. Always check results:

```typescript
const asset = await client.assets.getAsset("assetId", "collectionId");

if (asset instanceof Error) {
  console.error("Failed to fetch asset:", asset.message);
} else {
  console.log("Asset:", asset);
}
```

---

## License

MIT
