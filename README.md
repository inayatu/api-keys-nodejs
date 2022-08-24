# Generate and Manage API Keys

Create Nodejs API Keys to be used in other applications

## API Reference

#### Mint token

```http
  POST /api/v1/blockchain/mint/
```

| Header Params | Type     | Description                |
| :------------ | :------- | :------------------------- |
| `x-api-key`   | `string` | **Required**. Your API key |

| Body      | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `txH`     | `string` | **Required**. Blockchain transaction hash |
| `tokenId` | `number` | optional - NFT tokenId                    |

#### Add order

```http
  POST api/v1/blockchain/addorder/
```

| Header Params | Type     | Description                |
| :------------ | :------- | :------------------------- |
| `x-api-key`   | `string` | **Required**. Your API key |

| Body      | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `txH`     | `string` | **Required**. Blockchain transaction hash |
| `orderId` | `number` | optional - Blockchain orderID             |

and so on.

# Generate and Manage API Keys

Create Nodejs API Keys to be used in other applications

# Generate and Manage API Keys

Create Nodejs API Keys to be used in other applications

# Generate and Manage API Keys

Create Nodejs API Keys to be used in other applications

## Authors

- [@inayatu](https://www.github.com/inayatu)
