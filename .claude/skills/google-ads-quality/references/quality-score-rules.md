# Google Ads Quality Score Rules

## Quality Score Components (equal weight)

### 1. Ad Relevance
How closely the ad copy matches the user's search query.

**To score "Above Average":**
- Include exact keyword text in at least 2 headlines
- Pin keyword-match headlines to position 1
- Use keyword variations in descriptions
- Keep ad group themes tight (4-6 related keywords per group)

**Common mistakes:**
- Headlines that describe the product generally but don't contain actual keywords
- Same ad copy across multiple ad groups with different keywords
- Using "AI Infrastructure" headlines for "internal developer platform" keywords

### 2. Expected CTR
How likely the ad is to be clicked based on historical performance of similar ads.

**To score "Above Average":**
- Use numbers and specifics ("10 repos", "Free", "MIT Licensed")
- Include a clear CTA ("Try Free", "Start on GitHub", "Explore Repos")
- Use power words ("Free", "Open Source", "No Lock-In", "Instant")
- Differentiate from competitors ("Backstage Alternative", "No Platform Team")
- Use all available extensions (sitelinks, callouts, snippets)

**Common mistakes:**
- Generic headlines ("Learn More", "Click Here")
- No CTA in any headline
- Missing ad extensions

### 3. Landing Page Experience
How well the landing page matches the ad's promise and serves the user.

**To score "Above Average":**
- Landing page h1 should contain or echo the keyword
- Page content must match what the ad promises
- Primary CTA must be visible above the fold
- Page must load fast (<3s), be mobile-responsive, and use HTTPS
- URL must be a real, working route (not a 404)

**Common mistakes:**
- Ad promises "features" but lands on a contact form
- URL path doesn't exist (404 error)
- Landing page content is thin or unrelated to the keyword
- No CTA on the landing page

## Headline Writing Rules

### Character Limits
- Headlines: max 30 characters
- Descriptions: max 90 characters
- Display URL paths: max 15 characters each

### Headline Composition for RSA (15 max)
Recommended distribution:
- 4 headlines: exact keyword matches (pin to position 1)
- 4 headlines: value propositions and benefits
- 4 headlines: differentiators and features
- 3 headlines: CTAs and brand (pin to position 3)

### Pin Strategy
- Position 1: keyword-match headlines only (drives Ad Relevance)
- Position 2: leave unpinned (let Google optimize)
- Position 3: CTA or brand headlines (drives Expected CTR)

## URL Best Practices

### Final URL
- Must be a real, working page on your domain
- Should be the most relevant page for the ad group's intent
- Include UTM parameters for attribution

### Display URL Paths
- Use paths that reinforce the keyword theme
- Example: `forgespace.co/open-source/IDP` for IDP keywords
- Don't need to match the actual URL path
- Max 15 characters per path segment

### Sitelink URLs
- Must all be real, working pages
- Should cover different aspects of the product
- Features, Pricing, Ecosystem, Roadmap are strong choices

## AI Max Warning

**Always check whether AI Max is enabled before auditing ad quality.**

If AI Max is ON with "Personalização do texto" (text personalization) or "Expansão de URL final" (URL expansion):
- Google will IGNORE your rsa.json headlines and generate its own
- Google will REDIRECT to any page it chooses, including non-existent routes
- Your Quality Score data is unreliable because the ads being shown aren't yours
- Root cause: discovered in forgespace_br_en_visibility_v3 campaign (March 2026)

**Fix**: Campaign Settings > AI Max > toggle OFF > confirm "Desativar"

## How to Create RSA Headlines in Google Ads

1. Go to Campaign > Ad Group > Ads > Create RSA
2. Enter Final URL and display URL paths
3. Add all 15 headlines one by one in the headlines field
4. Add all 4 descriptions
5. Pin keyword-match headlines to position 1:
   - Click the pin icon next to a headline
   - Select "Position 1 only"
6. Pin CTA headlines to position 3:
   - Click the pin icon
   - Select "Position 3 only"
7. Watch the "Ad strength" indicator — aim for "Excellent"
8. Save and monitor quality rating (aim for "Bom")

**Tip**: The preview panel shows combinations Google might display. Check that every combination reads naturally.

## Quality Score Optimization Checklist

- [ ] Every keyword has at least 1 exact-match headline
- [ ] Keyword-match headlines are pinned to position 1
- [ ] All headlines ≤30 characters
- [ ] All descriptions ≤90 characters
- [ ] Each ad has 15 headlines and 4 descriptions
- [ ] CTA headlines are pinned to position 3
- [ ] All final URLs are real, working routes
- [ ] Display URL paths are set and meaningful
- [ ] Landing page h1 echoes the keyword theme
- [ ] Primary conversion CTA is on the landing page
- [ ] Landing page loads in <3 seconds
- [ ] Landing page is mobile-responsive
- [ ] 4+ sitelinks configured with real URLs
- [ ] 6+ callouts configured
- [ ] 2+ structured snippet sets configured
