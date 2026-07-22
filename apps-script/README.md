# Google Apps Script endpoint

This bound web app publishes only approved rows from `GitHub_Live_Data`.

1. Open the Executive Google Sheet and choose **Extensions → Apps Script**.
2. Replace the default `Code.gs` with this folder's `Code.gs`.
3. Click **Deploy → New deployment → Web app**.
4. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
5. Authorize the script, deploy it, and copy the URL ending in `/exec`.
6. Put that URL in `assets/live-config.js`, between the quotes.

Do not use a `/dev` URL. After any script change, create a new deployment version and retain the same production deployment URL.
