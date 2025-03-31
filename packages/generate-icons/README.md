# Generate Icons

This package can be installed in other packages within this workspace to
transform SVGs into React components.

You must also have `tsx` installed as a dev dependency.

```jsonc
// package.json
{
  "scripts": {
    "my-dev-script": "generate-icons --watch",
  },
  "devDependencies": {
    "generate-icons": "workspace:*",
    "tsx": "4",
  },
}
```

## Configuration

To customise the behaviour of the icon generation, you can pass flags to the
`generate-icons` command.

### SVGs path

- Flag: `--src <path>`
- Default value: `assets/icons`

Use this to configure the directory where the SVGs to transform are located.

You may use folders to organise the SVGs. However, note that the folder names
will be included in the name of the final component. Folder names in parentheses
are ignored.

For example, the SVG located at `assets/icons/(brand)/light/Logo.svg` will be
named `LightLogo.tsx`.

### Output path

- Flag: `--out <path>`
- Default value: `src/components/icons`

Use this configure the output directory for the transformed React components.
Icon components are added in a flat structure with a `index.ts` barrel file that
exports every component.

### Component suffix

- Flag: `--suffix <path>`
- Default value: `Icon`

Configure this value to change the suffix that is appended to the name of the
icon component.

### Watch mode

- Flag: `--watch`
- Default value: `false`

Pass this flag to enable **watch** mode, where changes to the SVGs will write
updates to the output directory in real-time.
