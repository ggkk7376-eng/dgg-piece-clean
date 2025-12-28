# Instrukcja wdrożenia na serwer / NAS

Twój projekt używa **SQLite**, co bardzo ułatwia wdrożenie. Baza danych jest po prostu plikiem (`dgg-piece.db`).

## Co musisz skopiować na serwer?

Cały folder projektu, **Z WYJĄTKIEM**:
- `node_modules` (to zainstalujemy na serwerze)
- `.next` (to się zbuduje na serwerze)
- `.git` (niepotrzebne)

Upewnij się, że kopiujesz:
- Folder `media` (tam są Twoje zdjęcia!)
- Plik `dgg-piece.db` (tam jest cała treść, w tym galeria!)
- Plik `.env` (lub ustaw zmienne środowiskowe na serwerze)

## Proces uruchomienia na serwerze (np. przez SSH lub w kontenerze)

1.  **Zainstaluj zależności**:
    ```bash
    npm install --legacy-peer-deps
    ```

2.  **Zbuduj aplikację**:
    ```bash
    npm run build
    ```
    *(To może chwilę potrwać)*

3.  **Uruchom serwer produkcyjny**:
    ```bash
    npm start
    ```
    *(Domyślnie na porcie 3000)*

## Ważne uwagi

-   **Backup**: Regularnie kopiuj plik `dgg-piece.db` oraz folder `media`. To wszystko, czego potrzebujesz, aby odzyskać stronę w razie awarii.
-   **Port**: Jeśli masz zajęty port 3000, możesz go zmienić np. tak: `PORT=3001 npm start`.
-   **Payload Secret**: Na produkcji w pliku `.env` powinien być **inny, trudny ciąg znaków** niż ten deweloperski "zmien_mnie...".

## Docker (opcjonalnie)

Jeśli Twój NAS obsługuje Dockera, możesz zbudować obraz. Pamiętaj tylko, aby zamontować (mount) plik bazy danych i folder media jako **wolumeny (volumes)**, aby nie zniknęły po restarcie kontenera.
