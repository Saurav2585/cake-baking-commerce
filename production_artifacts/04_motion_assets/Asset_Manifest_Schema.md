# Asset Manifest Schema

**Phase:** 4B — implementation-ready provenance contract
**Format recommendation:** version-controlled JSON or YAML validated against a typed schema; one immutable record version per asset revision

## Record shape

| Field | Type / allowed values | Required | Meaning and validation |
|---|---|---:|---|
| `manifest_schema_version` | semver string | Yes | Version of this contract; unsupported versions fail closed |
| `asset_id` | stable `asset_...` string | Yes | Immutable logical asset identifier |
| `version` | positive integer | Yes | Immutable revision; replacement creates a new version |
| `status` | `briefed`, `in_production`, `factual_review`, `accessibility_review`, `approved`, `rejected`, `deprecated`, `replaced` | Yes | Only `approved` may enter publishable seed data |
| `title` | string | Yes | Internal descriptive title, not marketing copy |
| `asset_family` | controlled enum: `retailer_identity`, `department`, `ingredient_macro`, `product_packshot`, `product_brand_mark`, `packaging_label`, `recipe`, `icon`, `illustration`, `texture`, `placeholder`, `og_social`, `favicon_app` | Yes | Routes production and QA rules |
| `role` | controlled placement role | Yes | E.g. `primary`, `gallery`, `detail`, `hero`, `thumbnail`, `fallback`, `social` |
| `relationships` | object of ID arrays | Yes | `department_ids`, `product_ids`, `recipe_ids`, `variant_ids`, `skus`; arrays may be empty but keys exist |
| `source_method` | `manual_design`, `css_svg`, `generated`, `generated_then_manual`, `commissioned_photo`, `licensed_photo`, `original_photo` | Yes | Exact creation category |
| `creator` | `{type, id_or_name}` | Yes | Person/team/tool attribution; no private data in public derivative |
| `created_at` | ISO-8601 timestamp | Yes | Creation time |
| `generation` | object/null | Conditional | For generated assets: provider/tool, model/version, full prompt reference or stored prompt, seed/settings where available, input asset IDs, edit description |
| `source_references` | array of source records | Yes | URI/internal ref, owner, accessed date, purpose; empty only for wholly original no-reference work |
| `licence` | object | Yes | SPDX/name/custom terms, source, territory/channel/expiry restrictions, proof reference; `not_applicable_original` explicit where valid |
| `factual_claims_represented` | array | Yes | Each `{claim, source_record_id, review_status}`; empty is explicit, not omitted |
| `prohibited_claim_review` | object | Yes | Checks certifications, dietary/health, origin, performance, popularity/reviews, scarcity, delivery, sustainability, expertise, included contents, edible status |
| `trade_dress_review` | object | Yes | Reviewer/date/result/notes for competitor or real-brand resemblance |
| `master` | file descriptor | Yes | Path, width, height, aspect ratio, format, colour space, alpha, bytes, checksum algorithm/value |
| `derivatives` | array of derivative descriptors | Yes | ID/path, purpose, parent version, crop rectangle, focal point, transformations, dimensions, DPR intent, format, bytes, checksum |
| `alt_text` | object | Yes | `owner`, `context`, `decision: informative|decorative|control_labelled`, `text` (empty when appropriate), approval status/date |
| `responsive_usage` | array | Yes | Placement, media/container range, object-fit/position, safe-zone notes; no device inference required |
| `optimisation_status` | `not_started`, `in_progress`, `passed`, `failed`, `waived` | Yes | Includes optimiser/version and results/notes |
| `quality_reviews` | array | Yes | Factual, visual, accessibility, originality, technical reviewer/date/result/issues |
| `approval` | object | Yes | Owner, decision, date, approved placements and limitations |
| `known_limitations` | array of strings | Yes | Empty explicitly if none identified |
| `replacement_history` | object | Yes | `replaces_asset_id/version`, `replaced_by_asset_id/version`, reason/date; nullable links |
| `checksum` | object | Yes | Canonical master checksum and algorithm, duplicated at top level for fast integrity checks |
| `notes` | string | No | Non-authoritative operational note |

## Illustrative typed contract

```ts
type AssetStatus =
  | 'briefed' | 'in_production' | 'factual_review'
  | 'accessibility_review' | 'approved' | 'rejected'
  | 'deprecated' | 'replaced';

type FileDescriptor = {
  path: string;
  width: number;
  height: number;
  aspectRatio: string;
  format: 'svg'|'avif'|'webp'|'png'|'jpeg'|'ico';
  colourSpace: 'sRGB';
  alpha: boolean;
  bytes: number;
  checksum: { algorithm: 'sha256'; value: string };
};

type AssetManifestRecord = {
  manifestSchemaVersion: string;
  assetId: `asset_${string}`;
  version: number;
  status: AssetStatus;
  title: string;
  assetFamily: string;
  role: string;
  relationships: {
    departmentIds: string[]; productIds: string[]; recipeIds: string[];
    variantIds: string[]; skus: string[];
  };
  sourceMethod: string;
  creator: { type: 'person'|'team'|'tool'; idOrName: string };
  createdAt: string;
  generation: null | {
    tool: string; modelVersion: string; prompt: string;
    seedOrSettings: Record<string, unknown>; inputAssetIds: string[];
    editDescription: string;
  };
  sourceReferences: Array<Record<string, string>>;
  licence: Record<string, unknown>;
  factualClaimsRepresented: Array<{
    claim: string; sourceRecordId: string; reviewStatus: 'pending'|'approved'|'rejected';
  }>;
  master: FileDescriptor;
  derivatives: Array<FileDescriptor & {
    derivativeId: string; purpose: string; parentVersion: number;
    crop: { x: number; y: number; width: number; height: number } | null;
    focalPoint: { x: number; y: number } | null;
    transformations: string[];
  }>;
  altText: {
    owner: string; context: string;
    decision: 'informative'|'decorative'|'control_labelled';
    text: string; approvalStatus: string; approvedAt: string | null;
  };
  responsiveUsage: Array<Record<string, unknown>>;
  optimisationStatus: string;
  qualityReviews: Array<Record<string, unknown>>;
  prohibitedClaimReview: Record<string, unknown>;
  tradeDressReview: Record<string, unknown>;
  approval: Record<string, unknown>;
  knownLimitations: string[];
  replacementHistory: Record<string, unknown>;
  checksum: { algorithm: 'sha256'; value: string };
};
```

## Integrity and lifecycle rules

1. IDs and approved versions are immutable. Editing bytes requires a new version and checksum.
2. Every derivative names one master version; derived checksums are independent.
3. Generated edits reference all input asset IDs. Generative outpainting is a new derivative or version, never an unrecorded crop.
4. Missing licence, source method, factual review, alt decision, checksum, or approval blocks publication.
5. A `replaced`/`deprecated` record stays in history; its replacement is bidirectionally linked.
6. No secrets, provider credentials, private filesystem paths, browser profiles, or unnecessary personal metadata enter the manifest.
7. A manifest validator must reject unknown asset families/statuses, malformed IDs/dates/checksums, nonpositive dimensions/versions, orphan relationships, duplicate ID-version pairs, and `approved` records with pending/failed reviews.

## Minimum reporting views

The implementation should be able to report: unapproved assets referenced by catalog; products/SKUs without required primary media; orphan files/records; missing/expired licences; missing alt decisions; generated assets without prompts/input lineage; failed claim/trade-dress reviews; oversized/unoptimised derivatives; checksum drift; and deprecated assets still in use.
