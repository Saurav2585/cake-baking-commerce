# Pantryform Phase 4B Motion Review Prototype

This isolated design-review layer reuses the approved Phase 4A static prototype without modifying it. It is not the production application and cannot persist, transact, authenticate or call external services.

## Run locally

From the repository root:

```sh
python3 -m http.server 4173 --directory design_review
```

Open `http://127.0.0.1:4173/phase_4b/?view=home`.

The screen selector provides every representative route. **Motion: full / reduced** is a directly reviewable toggle. Deterministic capture states use `motionState=before`, `motionState=mid` or `motionState=final`; `motion=reduce` and `motion=off` force static equivalents. No content depends on JavaScript or animation because the inherited Phase 4A HTML/CSS renders its final state before this enhancement loads.

## Review interactions

- Homepage: measured ingredient opening, making sequence, department atlas and Ingredient Theatre.
- Recipe review: four-step recipe-to-supplies rail.
- PDP: select a pack to review a bounded variant transition.
- Navigation/filter routes: interruptible drawer entrance and immediate Escape/close path.
- Add-to-demo-cart controls: bounded feedback with a single status owner; repeated activation cancels/restarts rather than queues.
- States and confirmation: non-motion-dependent error/success emphasis.

No autoplay audio, scroll hijacking, production catalog, generated production asset or real commerce behavior is present.
