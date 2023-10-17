<script lang="ts">
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import { supabase } from './fetch';

	let email: string | null = null;
	let dirtyEmail = false;
	let invalidEmail = false;
	let focusedEmail = false;

	let password: string | null = null;
	let dirtyPassword = false;
	let invalidPassword = false;
	let focusedPassword = false;

	let loading = false;
	let messageStatus: 'filling' | 'success' | 'failure' = 'filling';
	let errorMessage = '';
	$: disabled =
		!email ||
		!dirtyEmail ||
		invalidEmail ||
		focusedEmail ||
		!password ||
		!dirtyPassword ||
		invalidPassword ||
		focusedPassword;

	$: console.log(disabled);

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithPassword({
				email: email ?? '',
				password: password ?? ''
			});
			if (error) throw error;
			messageStatus = 'success';
		} catch (error) {
			messageStatus = 'failure';
			errorMessage = error.error_description || error.message;
		} finally {
			loading = false;
			email = null;
			password = null;
			dirtyEmail = false;
			dirtyPassword = false;
		}
	};

	const handleReset = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.resetPasswordForEmail(email ?? '');
			if (error) throw error;
			messageStatus = 'success';
		} catch (error) {
			messageStatus = 'failure';
			errorMessage = error.error_description || error.message;
		} finally {
			loading = false;
			email = null;
			password = null;
			dirtyEmail = false;
			dirtyPassword = false;
		}
	};
</script>

{#if messageStatus === 'filling'}
	<div>
		<h3>Cal autenticació!!</h3>
		<div class="form">
			<Textfield
				type="email"
				bind:dirty={dirtyEmail}
				bind:invalid={invalidEmail}
				updateInvalid
				bind:value={email}
				label="e-mail"
				style="min-width: 250px;"
				input$autocomplete="email"
				on:focus={() => (focusedEmail = true)}
				on:blur={() => (focusedEmail = false)}
				withTrailingIcon={!disabled}
			>
				<HelperText validationMsg slot="helper">Adreça incorrecta</HelperText>
			</Textfield>
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

			<Button {disabled} on:click={handleLogin}
				><Icon class="material-icons">send</Icon><Label>Enviar</Label></Button
			>
			<Button on:click={handleReset}>He oblidat la contrassenya</Button>
		</div>
	</div>
{:else if messageStatus === 'success'}
	<h3>Missatge rebut amb èxit</h3>
	<p>Mira el correu per confirmar l'autenticació</p>
{:else}
	<h3>Error d'autenticació</h3>
	<p>{errorMessage}</p>
{/if}
{#if loading}
	Carregant
{/if}

<style>
	.form {
		display: flex;
		align-items: center;
	}
</style>
