<script lang="ts">
  import { viewState } from "../../stores/view.store";
  import { tempLayoutState, layoutState } from "../../stores/layout.store";
  import Grid from "../../components/Svg/Grid.svelte";
  import { onMount } from "svelte";
  import {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleKeydown,
    handleKeyup,
  } from "../../helpers/handlers";

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
        <path
          stroke-width={2}
          stroke="black"
          d={`M ${$tempLayoutState.wall.start.x} ${$tempLayoutState.wall.start.y} L ${$tempLayoutState.wall.end.x} ${$tempLayoutState.wall.end.y}`}
        />
      {/if}
      {#each $layoutState.walls as wall}
        <path
          stroke-width={2}
          stroke="black"
          d={`M ${wall.start.x} ${wall.start.y} L ${wall.end.x} ${wall.end.y}`}
        />
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
