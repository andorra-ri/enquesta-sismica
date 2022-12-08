<script lang="ts">
	import { surveyPage } from './survey/store';
	import Survey0 from './survey/survey0.svelte';
	import Survey1 from './survey/survey1.svelte';
	import Survey2 from './survey/survey2.svelte';
	import Survey3 from './survey/survey3.svelte';
</script>


{#if $surveyPage === 0}
	<Survey0 />
{:else if $surveyPage === 1}
	<Survey1 />
{:else if $surveyPage === 2}
	<Survey2 />
{:else if $surveyPage === 3}
	<Survey3 />
{/if}


