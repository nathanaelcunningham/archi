<script lang="ts">
  import Canvas from "./components/Svg/Canvas.svelte";
  import ToolPicker from "./components/Tools/ToolPicker.svelte";
</script>

<div class="container">
  <ToolPicker />
  <Canvas />
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
