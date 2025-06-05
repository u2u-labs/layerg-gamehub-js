import { LayerGGamehubClient } from './src/client';
import { Environment } from './src/types';

const client = new LayerGGamehubClient({
    apiKey: 'API_KEY',
    apiKeyId: 'API_KEY_ID',
    env: Environment.Development,
    clientOptions: {
        retry: 1,
        timeout: 10000  
    }
})

const {} = await client.authenticate();