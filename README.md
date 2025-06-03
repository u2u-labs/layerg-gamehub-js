
# LayerG Gamehub Client SDK

## Installation

```bash
npm install layerg-gamehub-client
# or
yarn add layerg-gamehub-client
```

## Usage

### Import

```typescript
import { LayerGGamehubClient } from "layerg-gamehub-client";
```

### Initialize Client

```typescript
const client = new LayerGGamehubClient(
  "your-api-key",
  "your-api-key-id",
  "production", // or "development", "staging"
  { retry: 3, timeout: 10000 }
);
```

## Available Modules

The client splits logic into organized modules.

### 🔹 Assets

```typescript
// Get an asset
const asset = await client.assets.getAsset("assetId", "collectionId");

// Create a new asset
const newAsset = await client.assets.createAsset({
  name: "My New Asset",
  collectionId: "collectionId",
  // ...other fields
});

// Update an asset
const updatedAsset = await client.assets.updateAsset(
  { name: "Updated Name" },
  "collectionId",
  "assetId"
);
```

### Collections

```typescript
// Get a collection
const collection = await client.collections.getCollection("collectionId");

// Create a collection
const newCollection = await client.collections.createCollection({
  name: "New Collection",
  description: "Exciting description",
  // ...other fields
});

// Update a collection
const updatedCollection = await client.collections.updateCollection(
  { name: "Updated Collection" },
  "collectionId"
);

// Make a collection public
const success = await client.collections.publicCollection("collectionId");
```
## Example

```typescript
  const client = new LayerGGamehubClient("apiKey", "apiKeyId", "production");

  try {
    const collection = await client.collections.getCollection("my-collection-id");
    console.log("Collection:", collection);

    const asset = await client.assets.createAsset({
      name: "Sword of Legends",
      collectionId: "my-collection-id",
      // ...other fields
    });
    console.log("Created Asset:", asset);
  } catch (err) {
    console.error("Error:", err);
  }
```
