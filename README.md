# future-mobility-spy

A companion web app for [future-mobility][1] that mirrors the image
of a camera filming the [future-mobility][1] exhibition table from above to a seconds display or projector.

A click somewhere into the application window opens a configuration panel that allows to adjust and store
the following settings:

- which camera to use
- image transformations like translation, rotation, zoom and mirroring

## Compilation

This project utilizes the [Parcel](https://parceljs.org/) build tool.

Install dependencies with:

```
npm install
```

Create the bundles with:

```
npm run build
```

Run a development server with:

```
npm run serve
```

Deploy to GitHub Pages with:

```
npm run deploy
```

## Running

A web server for serving static files is required. Something simple like

```
npm reload --dir dist
```

or

```
python3 -m http.server --directory dist
```

suffices.

Point your web browser to `http://localhost:[PORT]/` where `PORT` is port number of the web server.
Depending on the web browser used, it may be necessary to grant access to the web camera separately.

## Configuration storage

The app stores its configuration client-side in `LocalStorage`.

## License

Copyright (c) 2021 IMAGINARY gGmbH Licensed under the MIT license (see [`LICENSE`](LICENSE) file).

[1]: https://github.com/IMAGINARY/future-mobility

## Credits

Created by Christian Stussak for IMAGINARY gGmbH.
