<script>
	import Display from '$lib/components/Display.svelte';
	import Keyboard from '$lib/components/Keyboard.svelte';

	let result = '0';

	function append(value) {
		if (result === '0') {
			result = value;
		} else {
			result += value;
		}
	}

	function calculate() {
		try {
			result = eval(result);
		} catch {
			result = 'Erro';
		}
	}

	function clear() {
		result = '0';
	}
</script>

<div style="display: flex; flex-direction: column; align-items: center;">
	<Display {result} />
	<Keyboard {append} {calculate} {clear} />
</div>
