<script lang="ts">
  import { tempLayoutState, layoutState } from "../../stores/layout.store";
  import {viewState} from 'src/stores/view.store'
  import Grid from "../../components/Svg/Grid.svelte";
  import { onMount } from "svelte";
  import {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleKeydown,
    handleKeyup,
  } from "../../helpers/handlers";
  import {
    drawPoints,
    renderWall2,
  } from "src/tools/Wall";

  let svgElem: SVGSVGElement;
  onMount(() => {
    viewState.update((prev) => ({ ...prev, svg: svgElem }));
  });
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />
<svelte:body on:contextmenu|preventDefault={() => null} />

<div class="svgContainer">
  <Grid />
  <svg
    bind:this={svgElem}
    class="svg"
    preserveAspectRatio="xMinYMin"
    on:mousedown={handleMouseDown}
    on:mousemove={handleMouseMove}
    on:mouseup={handleMouseUp}
  >
    <g
      transform={`translate(${$viewState.translate.x} ${$viewState.translate.y}) scale(${$viewState.scale})`}
    >
      {#if $tempLayoutState.line}
        <path
          stroke-width={2}
          stroke="black"
          d={`M ${$tempLayoutState.line.start.x} ${$tempLayoutState.line.start.y} L ${$tempLayoutState.line.end.x} ${$tempLayoutState.line.end.y}`}
        />
      {/if}
      {#each $layoutState.lines as line}
        <path
          stroke-width={2}
          stroke="black"
          d={`M ${line.start.x} ${line.start.y} L ${line.end.x} ${line.end.y}`}
        />
      {/each}

      {#if $tempLayoutState.wall}
        {@html renderWall2($tempLayoutState.wall)}
      {/if}
      {#each $layoutState.walls as wall}
        {@html renderWall2(wall)}
        <!-- {@html drawCorners(wall)} -->
        {@html drawPoints(wall)}
      {/each}
    </g>
  </svg>
</div>

<style>
  .svgContainer {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
