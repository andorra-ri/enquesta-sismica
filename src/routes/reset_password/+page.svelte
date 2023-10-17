<script lang="ts">
	import { supabase } from '$lib//fetch';
	import Button, { Icon, Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	let password: string | null = null;
	let dirtyPassword = false;
	let invalidPassword = false;
	let focusedPassword = false;
	let loading = false;
	let messageStatus: 'filling' | 'success' | 'failure' = 'filling';
	let errorMessage = '';

	$: disabled = !password || !dirtyPassword || invalidPassword || focusedPassword;

	const handleChange = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.updateUser({
				password: password ?? ''
			});
			if (error) throw error;
			messageStatus = 'success';
		} catch (error) {
			messageStatus = 'failure';
			errorMessage = error.error_description || error.message;
		} finally {
			loading = false;
			password = null;
			dirtyPassword = false;
		}
	};
</script>

<Textfield
	type="password"
	bind:dirty={dirtyPassword}
	bind:invalid={invalidPassword}
	updateInvalid
	bind:value={password}
	label="contrassenya"
	style="min-width: 250px;"
	input$autocomplete="email"
	on:focus={() => (focusedPassword = true)}
	on:blur={() => (focusedPassword = false)}
	withTrailingIcon={!disabled}
>
	<HelperText validationMsg slot="helper">Contrassenya incorrecta</HelperText>
</Textfield>
<Button {disabled} on:click={handleChange}
	><Icon class="material-icons">send</Icon><Label>Enviar</Label></Button
>
