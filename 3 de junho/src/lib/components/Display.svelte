<script>
	export let result;
</script>

<div class="Display">
	<input type="text" readonly bind:value={result} />
</div>

<style>
	.Display {
		margin-bottom: 10px;
	}
	
	input {
		width: 215px;
		height: 40px;
		font-size: 24px;
		text-align: left;
		border: 2px solid green;
		color: #d4af37;
		padding: 5px;
		border-radius: 4px;
	}
</style>
