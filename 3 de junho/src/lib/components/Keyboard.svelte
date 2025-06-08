<script>
	export let append;
	export let calculate;
	export let clear;
</script>

<div class="Keyboard">
	<div class="row">
		<button on:click={() => append('1')}>1</button>
		<button on:click={() => append('2')}>2</button>
		<button on:click={() => append('3')}>3</button>
		<button on:click={() => append('+')}>+</button>
	</div>
	<div class="row">
		<button on:click={() => append('4')}>4</button>
		<button on:click={() => append('5')}>5</button>
		<button on:click={() => append('6')}>6</button>
		<button on:click={() => append('-')}>-</button>
	</div>
	<div class="row">
		<button on:click={() => append('7')}>7</button>
		<button on:click={() => append('8')}>8</button>
		<button on:click={() => append('9')}>9</button>
		<button on:click={() => append('*')}>*</button>
	</div>
	<div class="row">
		<button on:click={calculate}>=</button>
		<button on:click={() => append('0')}>0</button>
		<button on:click={clear}>C</button>
		<button on:click={() => append('/')}>/</button>
	</div>
</div>

<style>
	button {
		width: 50px;
		height: 50px;
		margin: 2px;
		background-color: green;
		border: none;
		border-radius: 10px;
		color: white;
		font-size: 20px;
	}
</style>
