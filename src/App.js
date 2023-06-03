import { useEffect, useRef } from 'react';
import styles from './app.module.css';
import { useForm } from 'react-hook-form';

function App() {
	const submitButtonRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
		watch,
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
	});

	const sendData = (formData) => {
		console.log(formData);
		reset();
	};
	const password = watch('password', '');

	const emailProps = {
		required: true,
		minLength: { value: 5, message: 'Должно быть не меньше 5 символов' },
		maxLength: { value: 20, message: 'Должно быть не больше 20 символов' },
		pattern: {
			value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			message: 'Некорректный формат email-адреса',
		},
	};
	const passwordProps = {
		required: true,
		minLength: { value: 3, message: 'Пароль должно быть не меньше 3 символов' },
		maxLength: { value: 20, message: 'Пароль должно быть не больше 20 символов' },
		pattern: {
			value: /^(?=.*[A-Z])[a-zA-Z0-9]+$/,
			message:
				'Пароль должен содержать хотя бы одну заглавную букву и не использовать кирилицу',
		},
		validate: (value) => value === password || 'Пароли должны совпадать',
	};
	const repeatPasswordProps = {
		required: true,
		minLength: { value: 3, message: 'Поле должно быть не меньше 3 символов' },
		maxLength: { value: 20, message: 'Поле должно быть не больше 20 символов' },
		pattern: {
			value: /^(?=.*[A-Z])[a-zA-Z0-9]+$/,
			message:
				'Пароль должен содержать хотя бы одну заглавную букву и не использовать кирилицу',
		},
		validate: (value) => value === password || 'Пароли должны совпадать',
	};

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus();
		}
	}, [isValid]);

	return (
		<div className={styles.App}>
			<form className={styles.registrForm} onSubmit={handleSubmit(sendData)}>
				<h2>Регистрация</h2>
				<div className={styles.form_group}>
					<label className={styles.name}>Email:</label>
					<input
						type="email"
						name="email"
						placeholder="Почта"
						{...register('email', emailProps)}
					/>
					{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				</div>

				<div className={styles.form_group}>
					<label className={styles.name}>Password:</label>
					<input
						type="password"
						name="password"
						placeholder="Пароль"
						{...register('password', passwordProps)}
					/>
					{passwordError && (
						<div className={styles.errorLabel}>{passwordError}</div>
					)}
				</div>

				<div className={styles.form_group}>
					<label className={styles.name}>Repeat password:</label>
					<input
						type="password"
						name="repeat-password"
						placeholder="Повтор пароля"
						{...register('repeatPassword', repeatPasswordProps)}
					/>
					{repeatPasswordError && (
						<div className={styles.errorLabel}>{repeatPasswordError}</div>
					)}
				</div>
				<button ref={submitButtonRef} type="submit" disabled={!isValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
