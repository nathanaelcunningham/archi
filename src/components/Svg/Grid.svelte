<script lang="ts">
  import { viewState } from "../../stores/view.store";
  let cellSize = 20;
</script>

<svg class="grid" width="100%" height="100%">
  <defs>
    <pattern
      id={"grid"}
      width={cellSize}
      height={cellSize}
      x={$viewState.translate.x}
      y={$viewState.translate.y}
      patternUnits="userSpaceOnUse"
    >
      <path
        d={"M " +
          $viewState.pan.x +
          " 0" +
          " L " +
          $viewState.pan.x +
          " " +
          cellSize +
          " M 0 " +
          $viewState.pan.y +
          " L " +
          cellSize +
          " " +
          $viewState.pan.y}
        fill="none"
        stroke="#9aaaa9"
        stroke-width="1"
      />
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>

<style>
  .grid {
    width: 100%;
    height: 100%;
  }
</style>
