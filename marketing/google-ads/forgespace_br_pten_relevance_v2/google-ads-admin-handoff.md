# Google Ads Admin Handoff — `forgespace_br_en_visibility_v3`

## Why this exists

Repo-side automation is now accurate. The remaining blockers are inside Google Ads / CM360 and cannot be fixed from this repo or by the current Google Ads user.

Use this handoff when `npm run ads:google:diagnostics` reports:

- `search_only=false`
- `conversion_primary_github=false`
- `manual_ops_blocked`

## Current verified state (2026-04-03)

Verified by live Google Ads UI inspection through Chrome CDP:

- Campaign: `forgespace_br_en_visibility_v3`
- Campaign ID: `23643368321`
- AI Max: **OFF**
- Asset optimization (`Personalização de texto` + `expansão de URL final`): **disabled**
- Languages: **English + Português**
- Location: **Brasil**
- Ad groups present and qualified: `smb_en`, `oss_en`, `startups_en`, `smb_pt`
- Search Partners: **enabled**
- Campaign conversion goal: **`Cliques de saída`**

## Root blockers

### 1. Search Partners is still enabled

Live campaign settings show:

`Rede de pesquisa do Google, Parceiros de pesquisa`

But repo config requires Google Search only.

### 2. `fs_cta_github_click` is not available at campaign level

In Campaign Settings → `Metas de conversão` → `Alterar as metas da campanha`, the picker only shows:

- `Cliques de saída`

The expected conversion `fs_cta_github_click` does **not** appear there.

### 3. Editing the upstream conversion is permission-blocked

Google Ads surfaced this error during live inspection:

`Não foi possível editar a ação de conversão`

and explained that the relevant conversion action cannot be edited because the current account lacks the required Campaign Manager 360 / Floodlight permissions.

## Who needs to do this

Someone with one of the following:

- Google Ads admin access that can manage conversion actions, **or**
- Campaign Manager 360 / Floodlight access that owns the blocked conversion path

## Required admin actions

### Action A — restore/import the primary GitHub conversion

Goal: make `fs_cta_github_click` available as a selectable **Primary** conversion action in Google Ads.

Admin checklist:

1. Open Google Ads → `Metas` → `Conversões`
2. Find or import the conversion action for `fs_cta_github_click`
3. Ensure it is:
   - active
   - available in Google Ads (not only in GA4)
   - marked **Primary**
4. If the action is managed through Floodlight / CM360, fix permissions or restore it there first
5. Confirm `fs_cta_github_click` appears in the campaign goal picker under:
   - Campaign Settings → `Metas de conversão` → `Alterar as metas da campanha`

### Action B — switch the campaign goal away from `Cliques de saída`

After Action A succeeds:

1. Open Campaign Settings → `Metas de conversão`
2. Click `Alterar as metas da campanha`
3. Select `fs_cta_github_click`
4. Save the campaign settings

### Action C — disable Search Partners

1. Open Campaign Settings → `Redes`
2. Disable `Parceiros de pesquisa`
3. Leave only Google Search enabled

## What not to change

Do **not** change these unless a new repo-side decision says otherwise:

- AI Max (should remain OFF)
- text personalization / final URL expansion (should remain disabled)
- languages (`English` + `Português`)
- location (`Brasil`)
- ad groups (`smb_en`, `oss_en`, `startups_en`, `smb_pt`)

## Evidence to capture for handback

After admin changes, capture screenshots of:

1. Campaign Settings → `Redes` showing Search Partners disabled
2. Campaign Settings → `Metas de conversão` showing `fs_cta_github_click`
3. Goals/Conversions page showing the conversion active and Primary

## Repo-side rerun after admin fixes

From the repo root:

```bash
npm run ads:google:diagnostics
```

## Ready-to-send escalation message

Generate a current admin handoff message from the latest checkpoint summary:

```bash
npm run ads:google:handoff
```

This command also writes a reusable artifact next to the latest checkpoint summary:

`marketing/google-ads/forgespace_br_pten_relevance_v2/artifacts/<latest-checkpoint>/admin-handoff.txt`

Sync the GitHub tracking issue from the same latest checkpoint state:

```bash
npm run ads:google:sync-issue
APPLY=1 npm run ads:google:sync-issue
```

- Dry-run is the default.
- Use `APPLY=1` to update the live GitHub issue.

Expected improvements:

- `search_only=true`
- `conversion_primary_github=true`
- remaining blocker, if any, should be delivery-only rather than configuration/permission

## If the admin still cannot fix it

Escalate with this exact statement:

> `fs_cta_github_click` is missing from the campaign goal picker, and Google Ads reports that the conversion action cannot be edited because the current account lacks Campaign Manager 360 / Floodlight permissions. We need the CM360/Floodlight owner to restore or expose this conversion as a Primary Google Ads conversion before campaign-level automation can proceed.
