import { useEffect, useState, useRef } from 'react';
import styles from './app.module.css';

const sendData = (formData) => {
	console.log(formData);
};

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [emailBlur, setEmailBlur] = useState(false);
	const [passwordBlur, setPasswordBlur] = useState(false);
	const [repeatPasswordBlur, setRepeatPasswordBlur] = useState(false);

	const [emailError, setEmailErrorr] = useState('Емейл не может быть пустым');
	const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
	const [repeatPasswordError, setRepeatPasswordError] = useState(
		'Поле не может быть пустым',
	);

	const [formValid, setFormValid] = useState(false);

	const submitButtonRef = useRef();

	useEffect(() => {
		if (repeatPassword === '') {
			setRepeatPasswordError('Поле не может быть пустым');
		} else if (repeatPassword !== password){
			setRepeatPasswordError('Пароли не cовпадает');
		} else {
			setRepeatPasswordError('');
		}
	}, [repeatPassword, password]);

	useEffect(() => {
		if (emailError || passwordError || repeatPasswordError) {
			setFormValid(false);
		} else {
			setFormValid(true);
			setTimeout(() => {
				submitButtonRef.current.focus();
			}, 0);
		}
	}, [emailError, passwordError, repeatPasswordError]);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)) {
			setEmailErrorr('Некорректный формат email-адреса');
		} else {
			setEmailErrorr('');
		}
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);
		if (target.value.length < 3 || target.value.length < 8) {
			setPasswordError('Пароль должен быть длиной от 3 и не меньше 8 символов');
		} else if (!/^(?=.*[A-Z])[a-zA-Z0-9]+$/.test(target.value)) {
			setPasswordError(
				'Пароль должен содержать хотя бы одну заглавную букву и не использовать кирилицу',
			);
		} else {
			setPasswordError('');
		}
	};

	const onRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value);
	};

	const blurHandler = ({ target }) => {
		if (target.name === 'email') {
			setEmailBlur(true);
		} else if (target.name === 'password') {
			setPasswordBlur(true);
		} else if (target.name === 'repeat-password') {
			setRepeatPasswordBlur(true);
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, password });
	};

	return (
		<div className={styles.App}>
			<form className={styles.registrForm} onSubmit={onSubmit}>
				<h2>Регистрация</h2>
				<div className={styles.form_group}>
					<label className={styles.name}>Email:</label>
					<input
						type="email"
						name="email"
						value={email}
						placeholder="Почта"
						onChange={onEmailChange}
						onBlur={blurHandler}
					/>
					{emailBlur && emailError && (
						<div className={styles.errorLabel}>{emailError}</div>
					)}
				</div>

				<div className={styles.form_group}>
					<label className={styles.name}>Password:</label>
					<input
						type="password"
						name="password"
						value={password}
						placeholder="Пароль"
						onChange={onPasswordChange}
						onBlur={blurHandler}
					/>
					{passwordBlur && passwordError && (
						<div className={styles.errorLabel}>{passwordError}</div>
					)}
				</div>

				<div className={styles.form_group}>
					<label className={styles.name}>Repeat password:</label>
					<input
						type="password"
						name="repeat-password"
						value={repeatPassword}
						placeholder="Повтор пароля"
						onChange={onRepeatPasswordChange}
						onBlur={blurHandler}
					/>
					{repeatPasswordBlur && repeatPasswordError && (
						<div className={styles.errorLabel}>{repeatPasswordError}</div>
					)}
				</div>
				<button ref={submitButtonRef} type="submit" disabled={!formValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
