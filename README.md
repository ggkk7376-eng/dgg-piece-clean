# DGG Piece

## Development

Create `.env.local` file:

```sh
cp .env.example .env.local
```

Set the `PAYLOAD_SECRET` environment variable to a value generated using:

```sh
openssl rand -hex 32
```

Run required services in containers:

```sh
podman compose up -d
```

Run the development server:

```sh
bun dev
```

## Partners

- [Krysmet](https://krysmet.pl/)
- [Amstal](https://amstal.pl/)
- [Bentrup](https://bentrup.de/en/)
- [Rath](https://www.rath.com.pl/)
- [Notec](https://www.notec.pl/)
