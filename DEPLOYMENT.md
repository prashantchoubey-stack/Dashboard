# Deployment

- Repository: https://github.com/prashantchoubey-stack/Dashboard
- Public dashboard: https://prashantchoubey-stack.github.io/Dashboard/
- GitHub Pages workflow: `.github/workflows/pages.yml`
- Public data contract: `GitHub_Live_Data!A:G`
- Apps Script source: `apps-script/Code.gs`
- Endpoint configuration: `assets/live-config.js`

The workflow deploys only `index.html` and the three files under `assets/` used by the public dashboard. It does not publish repository source, spreadsheet internals, analyzer files, or Master Server paths.

## Activate the live endpoint

Follow `apps-script/README.md` to deploy the Apps Script web app. Then place the `/exec` URL in `assets/live-config.js` and push the change to `main`. The Pages workflow will publish the configured dashboard automatically.

## Verification

1. Open the `/exec` URL and confirm the response has `success: true`.
2. Confirm the response contains only `Dataset`, `Dimension`, `Label`, `Value`, `Status`, and `Updated_On`.
3. Open the public dashboard and use **Live data synced** to refresh.
4. Confirm PAL is `44,818`, portfolio is `67,786`, WP / WA is `17,657`, and Unity is `23`.
5. Change one approved, non-total test value in `GitHub_Live_Data`, refresh the dashboard, confirm the change appears, and then restore the approved value.
