<script lang="ts">
  import { toolState, type Tool } from "src/stores/tool.store";
  import { tools } from "src/tools/tools";

  function changeTool(tool: Tool) {
    toolState.update((prev) => ({
      ...prev,
      currentTool: tool,
    }));
  }
</script>

<div class="float">
  <div class="container">
    <div class="title">
      <div>Tools</div>
    </div>
    <div class="tool-list">
      <div class="tool" on:click={() => changeTool(tools.lineTool)}>
        <span>Line</span>
      </div>
      <div class="tool" on:click={() => changeTool(tools.wallTool)}>
        <span>Wall</span>
      </div>
    </div>
  </div>
</div>

<style>
  .float {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
  }

  .container {
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    background-color: #0f6f04;
    border-radius: 5px;
  }

  .title {
    flex-basis: 100%;
    text-align: center;
    font-size: 1.5em;
  }
  .tool-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .tool {
    flex-basis: 100%;
    width: 100%;
    text-align: center;
  }
  .tool:hover {
    background-color: #fff;
  }
</style>
